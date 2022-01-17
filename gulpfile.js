const gulp = require('gulp')
const csscomb = require('gulp-csscomb')
const jsonlint = require("gulp-jsonlint")
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')
const log = require('fancy-log')
const ohtml = require('gulp-htmllint')
const colors = require('ansi-colors')
const babel = require('gulp-babel')
const cleanCSS = require('gulp-clean-css')

const paths = {
    js: {
        src: './filestocheck/*.js',
        dest: './assets/scripts'
    },
    json: {
        src: './filestocheck/*.json',
        dest: './assets/scripts'
    },
    css: {
        src: './filestocheck/*.css',
        dest: './assets/style'
    },
    html: {
        src: './filestocheck/*.html',
        dest: './assets'
    }
}

const clean = () => {
    return del(['assets'])
}

const checkcss = () => {
    return gulp.src(paths.css.src)
        .pipe(csscomb())
}

const mincss = () => {
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css.dest))
}


const myCustomReporter = (file) => {
    log('File ' + file.path + ' is not valid JSON.')
}

const checkjson = () => {
    return gulp.src(paths.json.src)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter(myCustomReporter))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dest))
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
        .pipe(ohtml({}, htmllintReporter))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dest))
}

const checkjs = () => {
    return gulp.src(paths.js.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dest))
}
const watchjs = () => {
    return gulp.watch(paths.js.src, checkjs)
}
const build = gulp.series(clean, gulp.parallel(checkjs))

const watchcss = () => {
    return gulp.watch(paths.css.src, checkcss)
}

exports.checkjson = checkjson
exports.checkhtml = checkhtml
exports.checkcss = checkcss
exports.mincss = mincss
exports.checkjs = checkjs
exports.clean = clean
exports.watchjs = watchjs
exports.watchcss = watchcss
exports.build = build

//exports.default = 'adefinir'