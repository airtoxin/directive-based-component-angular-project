import sampleLogger from "./logger";
import { readFileSync } from "fs";
import { join } from "path";

class RootController {
    constructor(sampleRegister) {
        this.sampleRegister = sampleRegister;

        this.message = "";
    }

    onClick() {
        this.message = this.sampleRegister.get();
    }
}

const rootDirective = () => {
    return {
        restrict: "E",
        scope: {},
        controller: ["sampleRegister", RootController],
        controllerAs: "root",
        template: readFileSync(join(__dirname, "index.html"), "utf8")
    };
};

export default {
    directive: rootDirective,
    children: {
        sampleLogger
    }
};
