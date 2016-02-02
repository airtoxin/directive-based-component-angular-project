exports.config = {
    allScriptsTimeout: 10000,
    capabilities: {
        browserName: "chrome"
    },
    framework: "jasmine",
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["e2e-compile/**/*.spec.js"],
    jasmineNodeOpts: {
        showColors: true
    }
};
