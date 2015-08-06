/**
 * Created by an.han on 15/8/6.
 */
var gulp = require('gulp');
var package = require('./package');

gulp.task('move',       require('./task/move'));
gulp.task('generate',   require('./task/generate'));
gulp.task('deploy',     require('./task/deploy'));

gulp.task('default', ['move', 'generate']);
gulp.task('all', ['move', 'generate', 'deploy']);
