const path = require("path");
const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const copy = require("gulp-copy");
const exec = require("child_process").exec;
const babel = require("gulp-babel");
const rimraf = require("rimraf");
const exit = require("gulp-exit");
const protractor = require("gulp-angular-protractor");
const serve = require("gulp-serve");
const webserver = require("gulp-webserver");
const runSequence = require("run-sequence");

const defaultPreviewPort = 5555;
const defaultTestPort = 60000;

gulp.task("transpile:js", () => {
    browserify("src/index.js", {debug:true})
        // TODO: babelifyのオプションを.babelrcを読み込んで指定する
        .transform("babelify", { presets: ["es2015"], plugins: ["static-fs"] })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task("static-copy", () => {
    return gulp.src(["index.html"])
        .pipe(copy("dist"));
});

gulp.task("preview", serve({
    root: "dist",
    port: defaultPreviewPort
}));

gulp.task("watch", ["transpile:js", "static-copy"], () => {
    const watchers = [
        gulp.watch("src/**/*", ["transpile:js"]),
        gulp.watch(["index.html", "static/**/*"], ["static-copy"])
    ];

    watchers.forEach((watcher) => {
        watcher.on("change", (event) => {
            const filepath = path.relative(__dirname, event.path);
            /*eslint-disable*/
            console.log(`File ${filepath} was ${event.type}`);
            /*eslint-enable*/
        });
    });
});

gulp.task("test:e2e:setup-driver", (callback) => {
    exec("npm run setup-driver", callback);
});
gulp.task("test:e2e:start-server", () => {
    return gulp.src("dist")
        .pipe(webserver({
            host: "localhost",
            port: defaultTestPort,
            livereload: false
        }));
});
gulp.task("test:e2e:protractor", (callback) => {
    gulp.src(["test/e2e/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("test/e2e-compile"))
        .pipe(protractor({
            configFile: "test/protractor.config.js",
            args: ["--baseUrl", "http://localhost:8000"],
            autoStartStopServer: true,
            debug: false
        }))
        .on("end", () => { rimraf("test/e2e-compile", callback); })
        .on("error", () => { rimraf("test/e2e-compile", callback); });
});
gulp.task("test:e2e", (callback) => {
    runSequence(
        "test:e2e:setup-driver",
        "test:e2e:start-server",
        "test:e2e:protractor",
        () => {
            gulp.src("dummy").pipe(exit());
            callback();
        }
    );
});
gulp.task("default", ["preview", "watch"]);
