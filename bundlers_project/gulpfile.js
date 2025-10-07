const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = async () => {
    return (await import('gulp-autoprefixer')).default;
};
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
    return del(['dist']);
};

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'));
};

const styles = async (isDev) => {
    const autoprefixes = await autoprefixer();
    let stream = src('src/styles/**/*.css')
        .pipe(autoprefixes({
            cascade: false
        }));

    if (isDev) {
        stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(concat('main.css'));

    if (!isDev) {
        stream = stream.pipe(cleanCSS({
            level: 2
        }));
    }

    if (isDev) {
        stream = stream.pipe(sourcemaps.write());
    }

    return stream.pipe(dest('dist'))
        .pipe(browserSync.stream());
};

const htmlMinify = (isDev) => {
    return src('src/**/*.html')
        .pipe(isDev ? htmlMin({ collapseWhitespace: false }) : htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
};

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/images'));
};

const scripts = (isDev) => {
    let stream = src([
        'src/js/component/**/*js',
        'src/js/main.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'));

    if (!isDev) {
        stream = stream.pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()));
    } else {
        stream = stream.pipe(sourcemaps.init());
    }

    if (isDev) {
        stream = stream.pipe(sourcemaps.write());
    }

    return stream.pipe(dest('dist'))
        .pipe(browserSync.stream());
};

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg',
    ])
        .pipe(image())
        .pipe(dest('dist/images'));
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
};

const build = (done) => {
    series(clean, resources, htmlMinify.bind(null, false), scripts.bind(null, false), styles.bind(null, false), svgSprites, images)(done);
};

const dev = (done) => {
    series(clean, resources, htmlMinify.bind(null, true), scripts.bind(null, true), styles.bind(null, true), svgSprites, images, watchFiles)(done);
};

exports.clean = clean;
exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;
exports.build = build;
exports.dev = dev;

exports.default = dev;
