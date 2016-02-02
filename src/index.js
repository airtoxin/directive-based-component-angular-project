import angular from "angular";
import angularUiRouter from "angular-ui-router";
import angularCookies from "angular-cookies";

import SampleRegisterService from "./services/register";

import directiveAssign from "./utils/directive_assign";
import sharedDirectives from "./directives/shared";
import sampleHeader from "./directives/header";
import sampleRoot from "./directives/root";
import sampleRegister from "./directives/register";

const app = angular.module("app", [
    angularUiRouter,
    angularCookies
]).config(($stateProvider) => {
    $stateProvider
        /*eslint-disable*/
        .state("root",     {url: "/",        template: "<sample-root></sample-root>"})
        .state("register", {url: "/register", template: "<sample-register></sample-register>"})
        /*eslint-enable*/
    ;
}).config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise("/");
});

app.service("sampleRegister", SampleRegisterService);

directiveAssign(app, null, sharedDirectives);
directiveAssign(app, "sampleHeader", sampleHeader);
directiveAssign(app, "sampleRoot", sampleRoot);
directiveAssign(app, "sampleRegister", sampleRegister);
