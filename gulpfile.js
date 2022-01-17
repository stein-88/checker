const gulp = require('gulp')
const csscomb = require('gulp-csscomb')
const json = require("gulp-jsonlint")
const log = require('fancy-log')
const ohtml = require('gulp-htmllint')
const colors = require('ansi-colors')
const ojs = require('gulp-eslint')
const babel = require('gulp-babel')

const ccss = () => {
    return gulp.src('./assets/style/*.css')
        .pipe(csscomb())
}
const myCustomReporter = (file) => {
    log('File ' + file.path + ' is not valid JSON.')
}
const cjson = () => {
    return gulp.src('./assets/scripts/*.json')
        .pipe(json())
        .pipe(json.reporter(myCustomReporter))
}
const htmllintReporter = (filepath, issues) => {
    if (issues.length > 0) {
        issues.forEach((issue) => {
            log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg))
        })
        process.exitCode = 1
    }
}
const chtml = () => {
    return gulp.src('./assets/*.html')
        .pipe(ohtml({}, htmllintReporter))
}
const cjs = () => {
    return gulp.src(['./assets/scripts/*.js'])
        .pipe(babel())
        .pipe(ojs())
        .pipe(ojs.format())
        .pipe(ojs.failAfterError())
}
const watchjs = () => {
    return gulp.watch('./assets/scripts/*.js', cjs)
}
const watchjson = () => {
    return gulp.watch('./assets/scripts/*.js', cjson)
}
const watchhtml = () => {
    return gulp.watch('./assets/*.html', chtml)
}
const watchcss = () => {
    return gulp.watch('./assets/style/*.css', ccss)
}

exports.cjson = cjson
exports.chtml = chtml
exports.ccss = ccss
exports.cjs = cjs
exports.watchjs = watchjs
exports.watchjson = watchjson
exports.watchhtml = watchhtml
exports.watchcss = watchcss

//exports.default = 'adefinir'