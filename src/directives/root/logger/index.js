import { readFileSync } from "fs";
import { join } from "path";

class LoggerController {
    constructor() {}
}

const loggerDirective = () => {
    return {
        restrict: "E",
        scope: {},
        bindToController: {
            message: "="
        },
        controller: LoggerController,
        controllerAs: "logger",
        template: readFileSync(join(__dirname, "index.html"), "utf8")
    };
};

export default {
    directive: loggerDirective,
    children: {}
};
