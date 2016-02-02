import { readFileSync } from "fs";
import { join } from "path";

class RegisterController {
    constructor(sampleRegister) {
        this.sampleRegister = sampleRegister;

        this.message = "";
    }

    onClick() {
        this.sampleRegister.regist(this.message);
    }
}

const registerDirective = () => {
    return {
        restrict: "E",
        scope: {},
        controller: ["sampleRegister", RegisterController],
        controllerAs: "register",
        template: readFileSync(join(__dirname, "index.html"), "utf8")
    };
};

export default {
    directive: registerDirective,
    children: {}
};
