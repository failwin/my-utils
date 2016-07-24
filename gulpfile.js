
var path = require('path');

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch');

var    jshint = require('gulp-jshint');

var map = require('map-stream');

gulp.task('clean', function() {
    gulp.src(['./css/*.css.map'], {read: false})
    .pipe(clean()).on('error', log);
});

gulp.task('jshint', function() {
    return gulp.src(['./src/**/*.js'])
        .pipe(jshint())
        .pipe(map(function (file, cb) {
            if (!file.jshint.success) {
                console.log('JSHINT fail in ' + path.basename(file.path));
                file.jshint.results.forEach(function (result) {
                    if (result.error) {
                        var err = result.error;
                        var lineStr = 'line ' + pad(err.line + ',', 5);
                        var colStr = 'col ' + pad(err.character + ',', 5);
                        console.log(lineStr + colStr + err.reason);
                    }
                });
            }
            cb(null, file);
        }));

    function pad(msg,length) {
        while (msg.length < length) {
            msg = msg + ' ';
        }
        return msg;
    };
});

gulp.task('watch', function () {

});

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'jshint']);

gulp.task('build-min', ['clean', 'jshint']);

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));

    if (this.end) {
        this.end();
    }
    else if (this.emit) {
        this.emit("end");
    }
    //stream.end();
}