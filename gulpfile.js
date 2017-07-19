var gulp = require('gulp'),
    print = require('gulp-print'),
    babel = require('gulp-babel'),
    webserver = require('gulp-webserver');


gulp.task('libs', function(){
    return gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/babel-polyfill/dist/polyfill.js'])
         .pipe(print())
        .pipe(gulp.dest('build/libs'));
        // .pipe(gulp.dest(paths.build));
});

gulp.task('build',['js', 'libs'], function(){
   return gulp.src(['app/**/*.html', 'app/**/*.css'])
            .pipe(print())
            .pipe(gulp.dest('build'));            
    // return gulp.src(paths.babel) 
    //         .pipe(gulp.dest(paths.build));
});

gulp.task('js', function() {
   return gulp.src('app/**/*.js')
        .pipe(print())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
    // return gulp.src(paths.babel)              
    //   .pipe(gulp.dest(paths.build));
});


// gulp.task('js', function() {
//   return gulp.src(paths.babel)               // #1. select all js files in the app folder                   // #2. print each file in the stream
//       .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
//       .pipe(gulp.dest(paths.build));               // #4. copy the results to the build folder
// });

gulp.task('serve', ['build'], function() {
    gulp.src('build')
        .pipe(webserver({open: true}));
    // gulp.src('public')
    //     .pipe(webserver({host:'localhost', port:6229,open: true}));
    //  gulp.src('./')
    //     .pipe(webserver({host:'localhost', port:6229,open: true}));
});



gulp.task('watch', function(){
     gulp.watch('app/**/*.*', ['build']);
});

//gulp.task('default', ['build']);


gulp.task('default', ['serve','watch']);


// //grab our gulp packages
// var gulp=  require('gulp'),
//     jshint= require('gulp-jshint'),
//     sourcemaps = require('gulp-sourcemaps'),
//     concat = require('gulp-concat'),
//     gutil= require('gulp-util'),
//     babel = require('gulp-babel');;


// //create a default task and just log a message

// // gulp.task('default', function(){
// //        return gutil.log('Gulp is running!');
// // });

// gulp.task('default',['watch']);


// //configure the jshint task
// gulp.task('jshint', function(){
//    return gulp.src('source/javascript/**/*.js')
//    .pipe(jshint())
//    .pipe(jshint.reporter('jshint-stylish'));
// });

// //configure which files to watch and what tasks to use on file changes
// gulp.task('watch', function(){
//    gulp.watch('source/javascript/**/*.js',['jshint']);
// });


// gulp.task('build-js', function() {
//   return gulp.src('source/javascript/**/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//             presets: ['es2015']
//         }))
//      // .pipe(babel())
//     //   .pipe(babel({
//     //         plugins: ['transform-runtime']
//     //     }))
//     .pipe(concat('bundle.js'))
//       //only uglify if gulp is ran with '--type production'
//     .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('public/assets/javascript'));
// });


// var gulp = require('gulp');
// var babel = require('gulp-babel');
// var watch = require('gulp-watch');
// var rimraf = require('rimraf');
// var paths = {
//   babel: 'source/javascript/main.js',
//   build: 'public/assets/javascript'
// };

// gulp.task('clean', function(cb) {
//   rimraf(paths.build, cb);
// });

// gulp.task('build', ['clean'], function() {
//   return gulp
//     .src(paths.babel)
//     .pipe(print())
//     .pipe(babel({
//              presets: ['es2015']
//          }))
//     .pipe(gulp.dest(paths.build));
// });

// gulp.task('watch', ['build'], function() {
//   return watch(paths.babel, function() {
//     gulp.start('build');
//   });
// });

// gulp.task('default', ['build']);
