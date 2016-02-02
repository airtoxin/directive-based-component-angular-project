const registered = [];

export default function directiveAssign(app, rootDirectiveName, rootDirective) {
    if (rootDirectiveName && rootDirective.directive) {
        if (registered.includes(rootDirectiveName)) throw new Error(`Directive name was already registered: ${rootDirectiveName}`);
        registered.push(rootDirectiveName);

        app.directive(rootDirectiveName, rootDirective.directive);
    }
    if (!rootDirective.children) return app;

    for (const key of Object.keys(rootDirective.children)) {
        directiveAssign(app, key, rootDirective.children[key]);
    }

    return app;
}
