const gulp = require('gulp')
const jsonlint = require("gulp-jsonlint")
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')
const log = require('fancy-log')
const ohhtml = require('gulp-htmllint')
const colors = require('ansi-colors')
const babel = require('gulp-babel')
const cleanCSS = require('gulp-clean-css')
const wxmlmin = require('gulp-wxml-min')
const eslint = require('gulp-eslint')

const paths = {
    js: {
        src: './filestocheck/jss/*.js',
        dest: './assets/scripts'
    },
    json: {
        src: './filestocheck/jsons/*.json',
        dest: './assets/scripts'
    },
    css: {
        src: './filestocheck/csss/*.css',
        dest: './assets/style'
    },
    html: {
        src: './filestocheck/htmls/*.html',
        dest: './assets'
    }
}

const clean = () => {
    return del(['assets'])
}

const checkcss = () => {
    return gulp.src(paths.css.src)
        .pipe(cleanCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(paths.css.dest))
}

const myCustomReporter = (file) => {
    log('File ' + file.path + ' is not valid JSON.')
}

const checkjson = () => {
    return gulp.src(paths.json.src)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter(myCustomReporter))
        .pipe(gulp.dest(paths.json.dest))
}

const htmllintReporter = (filepath, issues) => {
    if (issues.length > 0) {
        issues.forEach((issue) => {
            log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg))
        })
        process.exitCode = 1
    }
}

const checkhtml = () => {
    return gulp.src(paths.html.src)
        .pipe(ohhtml({}, htmllintReporter))
        .pipe(wxmlmin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true
        }))
        .pipe(gulp.dest(paths.html.dest))
}

const checkjs = () => {
    return gulp.src(paths.js.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dest))
}

const watcher = () => {
    gulp.watch(paths.js.src, checkjs)
    gulp.watch(paths.css.src, checkcss)
    gulp.watch(paths.json.src, checkjson)
    gulp.watch(paths.html.src, checkhtml)
    return null
}

const build = gulp.series(clean, gulp.parallel(checkjs, checkjson, checkhtml, checkcss))

exports.checkjson = checkjson
exports.checkhtml = checkhtml
exports.checkcss = checkcss
exports.checkjs = checkjs
exports.clean = clean
exports.watcher = watcher
exports.build = build
exports.default = build