"use strict";
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var cleanCSS = require("gulp-clean-css");
var pump = require("pump");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
// var sass = require("gulp-ruby-sass");
var sass = require('gulp-sass');

gulp.task("imagemin", () => {
    gulp.src("./src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"));

})

gulp.task("minify-css", () => {
    gulp.src("./src/css/*.css")
        .pipe(cleanCSS({ compatibility: "ie8" }, (details) => {
            console.log(details.name);
        }))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("compress", (cb) => {
    pump([
            gulp.src("src/js/*.js"),
            uglify(),
            gulp.dest("dist/js")
        ],
        cb
    );
});

gulp.task("scripts", () => {
    gulp.src(["dist/js/all.js", "dist/js/2.js", "dist/js/1.js"]).
    pipe(concat("main.js"), { newLine: ';' }).
    pipe(gulp.dest("dist/js/"));
});

gulp.task("combinCss", () => {
    gulp.src(["dist/css/common.css", "dist/css/base.css"])
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest("dist/css/"));
});

// gulp.task("sass", () => {
//     sass("src/sass/abc.scss")
//         .on("error", sass.logError)
//         .pipe(gulp.dest("dist/sass/"));
// });

gulp.task('sass', function() {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist/sass/"));
});

// gulp.task('sass:watch', function() {
//     gulp.watch('./sass/**/*.scss', ['sass']);
// });


gulp.task("default", () => {
    gulp.start("imagemin", "minify-css", "compress");
});