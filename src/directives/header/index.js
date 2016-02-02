import { readFileSync } from "fs";
import { join } from "path";

class HeaderController {
    constructor() {}
}

const headerDirective = () => {
    return {
        restrict: "E",
        scope: {},
        controller: HeaderController,
        controllerAs: "header",
        template: readFileSync(join(__dirname, "index.html"), "utf8")
    };
};

export default {
    directive: headerDirective,
    children: {}
};
