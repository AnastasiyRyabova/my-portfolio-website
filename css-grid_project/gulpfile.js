import { src, dest, series } from 'gulp';
import concat from 'gulp-concat';
import htmlMin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import gulpImage from 'gulp-image';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import browserSync from 'browser-sync';

const clean = () => {
    return del(['dist']);
};

const style = (isDev) => {
    let stream = src('src/style/**/*.css')
        .pipe(autoprefixer({
            cascade: false
        }));

    if (isDev) {
        stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(concat('style.css'));

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

const processImages = () => {
    return src([
        'src/image/**/*.jpg',
        'src/image/**/*.png',
        'src/image/*.svg',
        'src/image/**/*.jpeg',
    ])
        .pipe(gulpImage())
        .pipe(dest('dist/image'));
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
};

const build = (done) => {
    series(clean, htmlMinify.bind(null, false), style.bind(null, false), processImages)(done);
};

const dev = (done) => {
    series(clean, htmlMinify.bind(null, true), style.bind(null, true), processImages, watchFiles)(done);
};

export { clean, style, htmlMinify, build, dev };
export default dev;
