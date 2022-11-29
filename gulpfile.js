import g from "gulp";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";
import prettier from "gulp-prettier";
import image from "gulp-image";
import mocha from "gulp-mocha";

function autoprefix() {
    // const postcss = require("gulp-postcss");
    // const autoprefixer = require("autoprefixer");
    // const sourcemaps = require("gulp-sourcemaps");
    return g
        .src("dev/css/styles.css")
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(g.dest("build/css/"));
}

function minifyCSS() {
    // const cleanCSS = require("gulp-clean-css");
    // const sourcemaps = require("gulp-sourcemaps");
    return g
        .src("build/css/styles.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("."))
        .pipe(g.dest("dist/css/"));
}

// Apply global prettier to HTML
// Minor change to show difference from personal Prettier settings.
function prettierHTML() {
    // const prettier = require("gulp-prettier");
    return g
        .src("dev/index.html")
        .pipe(prettier({ bracketSameLine: true }))
        .pipe(g.dest("dist"));
}

// Optimize images
function optimizeImg() {
    return g.src("dev/img/*").pipe(image()).pipe(g.dest("dist/img"));
}

// Run tests
function testAll() {
    return g.src("dev/test/test-movie-details.js", { read: false }).pipe(
        mocha({ reporter: "min" }).on("error", (err) => {
            console.error(err);
        })
    );
}

function moveJS() {
    return g.src("dev/js/*").pipe(g.dest("dist/js"));
}
function moveConfig() {
    return g.src("dev/config.json*").pipe(g.dest("dist/"));
}

export default g.series(
    g.parallel(prettierHTML, optimizeImg, g.series(autoprefix, minifyCSS)),
    testAll,
    moveJS,
    moveConfig
);
