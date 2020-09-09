import gulp from 'gulp';
const compileMarkup = () =>
  gulp.src("./src/public/**/*.html").pipe(gulp.dest("./lib/public/"));

const compile = gulp.series(compileMarkup);
compile.description = "compile all sources";

const defaultTasks = gulp.series(compileMarkup);

export {
  compile,
  compileMarkup
  // compileScript,
  // compileStyle,
};

export default defaultTasks;
