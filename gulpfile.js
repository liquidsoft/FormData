const
	gulp = require("gulp"),
	babel = require("gulp-babel");

gulp.task("default", ["build"], () => {
});

/*
 -------------------------------
 Build with babel
 -------------------------------
 */

gulp.task("build", () => {
	return gulp.src("./FormData.js")
		.pipe(babel())
		.pipe(gulp.dest("./build"));
});