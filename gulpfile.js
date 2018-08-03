
/*
 Destinations
 */

gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins();

sass = require('gulp-sass');
postcss = require('gulp-postcss');
cssnext = require('postcss-cssnext');
browserSync = require('browser-sync');
runSequence = require('run-sequence');
sourcemaps = require('gulp-sourcemaps');
template = require('gulp-template');
styleguide = require('sc5-styleguide');
ejs = require("gulp-ejs");
rename = require("gulp-rename");
svgmin = require("gulp-svgmin");
fs = require('fs');
concat = require("gulp-concat");
watch = require('glob-watcher');


/*
 File Destinations
 */

path = {
	'root': './',
	// images
	'imageDest': 'build/assets/img/',
	'imagePath': 'src/img/**/*',
	// SVG
	// JS
	'jsDest': 'build/assets/js/',
	'jsPath': 'src/js/**/*.js',
	'jsConcatDist': 'script.js',
	'jsConcatDistPath': 'src/js/',
	// Sass
	'sassPass': 'src/sass/**/*.scss',
	'sassIgnore': '!src/sass/',
	// Css
	'cssDest': 'build/assets/css/',
	// EJS
	'ejsDest': 'build/',
	'ejsConfig': './src/ejs/config.json',
	//Souce map
	'souceMapDest': './',
	// Style guide
	'styleGuideDest': 'doc/styleguide/',
	'styleGuideOverview': 'doc/styleguide/styleguide.md',
	'styleGuideName': '',
	'styleGuidePort': '4000'
};

var sassLintConf = {
	configFile: '.sass-lint.yml'
};
/*
 Sass Tasks
 */

gulp.task('scss', function () {
	var processors = [
		cssnext({
			browsers: ['last 2 versions', 'ie 10', 'ie 9', 'iOS >= 7', 'Android >= 4.2'],
			features: {
				customProperties: true,
				calc: true,
				customMedia: true,
				mediaQueriesRange: false
			}
		})
	];
	return gulp.src(path.sassPass)
	.pipe($.plumber({
		errorHandler: function (err) {
			console.log(err.messageFormatted);
			this.emit('end');
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss(processors))
	// テーマフォルダのルートにsourcemapを生成する
	.pipe(sourcemaps.write(path.souceMapDest))
	.pipe(gulp.dest(path.cssDest))

});


// cssの圧縮
gulp.task('cssmin', function () {
	return gulp.src(path.cssDest + 'style.css')
	.pipe($.cssmin())
	.pipe($.rename({
		extname: '.min.css'
	}))
	.pipe(gulp.dest(path.cssDest))
	.pipe(browserSync.stream());

});

/*
 Js Tasks
 */

gulp.task('script' ,function () {
	return gulp.src(
		[
			'',
			'',
			'',

		]
	).pipe($.plumber())
	.pipe(concat(path.jsConcatDist))
	.pipe($.uglify())
	.pipe($.rename({
		extname: '.min.js'
	}))
	.pipe(gulp.dest(path.jsDest))
	.pipe(browserSync.reload({ stream: true }));
});
/*
 Image Tasks
 */

gulp.task('image-opt', function () {
	return gulp.src(path.imagePath)
	.pipe($.plumber())
	.pipe($.image({
		pngquant: true,
		optipng: true,
		zopflipng: true,
		advpng: true,
		jpegRecompress: false,
		jpegoptim: false,
		mozjpeg: true,
		gifsicle: true,
		svgo: false,
		concurrent: 10,
	}))
	.pipe(gulp.dest(path.imageDest));
});


gulp.task('svgmin', function () {
	return gulp.src(path.imagePath + '**/*.svg')
	.pipe(svgmin())
	.pipe(gulp.dest(path.imageDest));
});


/*
  EJS Tasks
 */

gulp.task("ejs", function () {
	json = JSON.parse(fs.readFileSync(path.ejsConfig));
	return gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
	.pipe($.plumber({
		errorHandler: function (err) {
			console.log(err.messageFormatted);
			this.emit('end');
		}
	}))
	.pipe(ejs(json, {"ext": ".html"}))
	.pipe(rename({extname: ".html"}))
	.pipe(gulp.dest(path.ejsDest))
});


/*
 Browser Sync Tasks
 */

gulp.task('browser-sync', function () {
	return browserSync({
		server: {
			baseDir: "./build/",
			directory: false
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});
gulp.task('watch', function () {
	gulp.watch(path.root + "**/*.html").on('change', browserSync.reload);
	gulp.watch(path.root + "**/*.ejs", gulp.series('ejs'));
	gulp.watch(path.jsPath, gulp.series('script'));
	gulp.watch(path.sassPass, gulp.series('scss', 'cssmin' ));

});


//---------------------------------------------------------------------------
// Tasks
//---------------------------------------------------------------------------
// default

gulp.task('default', gulp.series(
	gulp.parallel(
		'browser-sync',
		'watch',
	)
));

// 画像圧縮

gulp.task('image', gulp.series(
	gulp.parallel('image-opt', 'svgmin')
));

// sass lint task
gulp.task('test-sass', function () {
	return gulp.src([path.sassPass, path.sassIgnore + 'style.scss', path.sassIgnore + 'foundation/bootstrap/**/*.scss', path.sassIgnore + 'foundation/fontawesome/**/*.scss'])
	.pipe($.sassLint())
	.pipe($.sassLint.format())
	.pipe($.sassLint.failOnError())
});
