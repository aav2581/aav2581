const { src, dest, parallel, series, watch } = require('gulp');

const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;

const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const fileinclude = require('gulp-file-include');

const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
 

const startWatch = () => {
    browserSync.init({
		server: {
			baseDir: "./app/"
        },
        notify: false,
		online: true,
	});
    watch('./src/index.html', htmlInclude);
    watch('./src/js/**/*.js', scripts);
    watch('./src/scss/**/*.scss', styles);
    watch('./src/img/dest/**.*', images);
    watch('./src/img/**.svg', svgSprites);
}

const htmlInclude = () => {
	return src('./src/index.html')
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}

const scripts = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
                rules: [
                  {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                  }
                ]
              }
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})
		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

const styles = () => {
    return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
    }).on('error', notify.onError()))
    .pipe(rename({
        suffix: '.min',
    }))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(cleanCSS({
        level: 2,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

const images = () => {
    return src('./src/img/**.*')
    .pipe(newer('./app/images/')) 
	.pipe(imagemin()) 
	.pipe(dest('./app/img/'))
}

const svgSprites = () => {
    return src('./src/img/**.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest('app/img'))
} 

const clean = () => {
    return del('./app/*', { force: true })
}

const cleanDist = () => {
    return del('./dist/*', { force: true })
}

const fontMigration = () => {
    return src('./src/fonts/**/*.*')
    .pipe(dest('./app/fonts'))
}

const buildFile = () => {
    return src([
        './app/index.html',
        './app/css/main.min.css',
        './app/img/**/*.*',
        './app/fonts/**.*',
        './app/js/main.js',
    ], {base: 'app'})
    .pipe(dest('./dist'))
}



exports.htmlInclude = htmlInclude;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.svgSprites = svgSprites;
exports.fontMigration = fontMigration;

exports.clean = clean;
exports.cleanDist = cleanDist;
exports.startWatch = startWatch;

exports.buildFile = buildFile;

exports.default = series(clean, parallel(htmlInclude, scripts, svgSprites, images), fontMigration, styles, startWatch);
exports.build = series(cleanDist, htmlInclude, scripts, fontMigration, svgSprites, images, styles, buildFile);