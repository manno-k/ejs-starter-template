/*
 Destinations
 */

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins();

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var styleguide = require('sc5-styleguide');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var fs = require('fs');



/*
 File Destinations
 */

var path = {
    'root': './',
    // images
    'imageDest': 'build/assets/img/',
    'imagePath': 'src/img/**/*',
    // SVG
    // JS
    'jsDest': 'build/assets/js/',
    'jsPath': 'src/js/**/*.js',
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
 Js Tasks
 */

gulp.task('uglify', function () {
    var eachscript = gulp.src(path.jsPath)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.jsDest));
});

gulp.task("concat", function () {
    return gulp.src([
        '',
        ''
    ])
        .pipe($.plumber())
        .pipe($.concat("minified.js"))
        .pipe(gulp.dest(path.jsDest));
});

/*
 Sass Tasks
 */

gulp.task('scss', function (){
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


// メディアクエリを最適化
gulp.task('combineMq', function () {
    return gulp.src('./style.scss')
        .pipe($.combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(path.cssDest));
});


// cssの圧縮
gulp.task('cssmin', function () {
    gulp.src('./style.scss')
        .pipe($.cssmin())
        .pipe($.rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(path.cssDest));
});

/*
 Style Guide Tasks
 */

gulp.task('styleguide:generate', function () {
    return gulp.src(path.sassPass)
        .pipe(styleguide.generate({
            port: path.styleGuidePort,
            title: path.styleGuideName,
            server: true,
            rootPath: path.styleGuideDest,
            overviewPath: path.styleGuideOverview,
        }))
        .pipe(gulp.dest(path.styleGuideDest));
});

gulp.task('styleguide:applystyles', function () {
    return gulp.src(path.sassPass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(path.styleGuideDest));
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
    gulp.src(path.imagePath + '**/*.svg')
        .pipe($.svgmin())
        .pipe(gulp.dest(path.imageDest));
});

/*
  EJS Tasks
 */

gulp.task("ejs", function () {
    json = JSON.parse(fs.readFileSync(path.ejsConfig));
    gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
        .pipe($.plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(ejs(json,{"ext": ".html"}))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(path.ejsDest))
});


/*
 Browser Sync Tasks
 */

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./build/",
            directory: false
        }
    });
});
gulp.task('bs-reload', function () {
    return browserSync.reload();
});


//---------------------------------------------------------------------------
// Tasks
//---------------------------------------------------------------------------
// default

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(path.root + "**/*.html", ['bs-reload']);
    gulp.watch(path.root + "**/*.ejs", function () {
        return runSequence(
            'ejs',
            'bs-reload'
        );
    });
    gulp.watch(path.sassPass, function () {
        return runSequence(
            'scss',
            'combineMq',
            'cssmin',
            'bs-reload'
        );
    });
    gulp.watch(path.jsPath, function () {
        return runSequence(
            'uglify',
            'concat',
            'bs-reload'
        );
    });
});

// 画像圧縮
gulp.task('image', function () {
    return runSequence(
        'image-opt',
        'svgmin'
    );
});

// sass lint task
gulp.task('test-sass', function () {
    return gulp.src([path.sassPass, path.sassIgnore + 'style.scss', path.sassIgnore + 'foundation/bootstrap/**/*.scss', path.sassIgnore + 'foundation/fontawesome/**/*.scss'])
        .pipe($.sassLint())
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError())
});

// Styleguide 生成
gulp.task('style', ['styleguide:generate', 'styleguide:applystyles'], function () {
    gulp.watch(path.sassPass, ['styleguide:generate', 'styleguide:applystyles', 'bs-reload']);
});