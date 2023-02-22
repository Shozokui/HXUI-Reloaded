const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const livereload = require("gulp-livereload");
const postcss = require("gulp-postcss");
const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");

const postcssOptions = {
  rootValue: 16,
  unitPrecision: 5,
  propList: [
    "font",
    "font-size",
    "line-height",
    "letter-spacing",
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "margin*",
    "padding*",
  ],
  selectorBlackList: [],
  replace: true,
  mediaQuery: true,
  minPixelValue: 0,
  exclude: /node_modules/i,
};

const paths = {
  cleanDir: "build/*",
  build: "build/",
  stylesSrc: "src/styles/styles.scss",
};

function cleanBuild() {
  return new Promise(function (resolve, reject) {
    gulp
      .src(paths.cleanDir, { read: false, allowEmpty: true })
      .pipe(clean({ force: true }))
      .pipe(livereload())
      .on("end", resolve())
      .on("error", reject());
  });
}

function copyAssets() {
  return new Promise(function (resolve, reject) {
    gulp
      .src("src/assets/*")
      .pipe(gulp.dest("build/assets/"))
      .on("end", resolve())
      .on("error", reject());
  });
}

function buildStyles() {
  return new Promise(function (resolve, reject) {
    gulp
      .src(paths.stylesSrc)
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest(paths.build))
      .pipe(livereload())
      .on("end", resolve())
      .on("error", reject());
  });
}

function buildDeps() {
  return new Promise(function (resolve, reject) {
    gulp
      .src("src/script/deps/*.js")
      .pipe(concat("deps.js"))
      .pipe(gulp.dest("build/"))
      .on("end", resolve())
      .on("error", reject());
  });
}

function buildScript(cb) {
  return new Promise(function (resolve, reject) {
    browserify({
      entries: ["./src/script/main.js"],
      // Pass babelify as a transform and set its preset to @babel/preset-env
      transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
    })
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("build/"))
      .on("end", resolve())
      .on("error", reject());
  });
}

function buildHtml() {
  return new Promise(function (resolve, reject) {
    gulp
      .src("src/index.html")
      .pipe(gulp.dest(paths.build))
      .pipe(livereload())
      .on("end", resolve())
      .on("error", reject());
  });
}

function watch(cb) {
  livereload.listen();

  gulp.watch(
    ["src/*.html", "src/styles/**/*.scss", "src/script/**/*.js"],
    gulp.series(buildStyles, buildDeps, buildScript, buildHtml)
  );
}

exports.default = gulp.series(
  cleanBuild,
  copyAssets,
  buildStyles,
  buildDeps,
  buildScript,
  buildHtml,
  watch
);
