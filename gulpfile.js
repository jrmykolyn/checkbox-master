// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const babel = require( 'gulp-babel' );
const gulp = require( 'gulp' );
const PathMap = require( 'sfco-path-map' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const PATHS = new PathMap( {
	src: './src',
	dest: './dist',
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
/**
 * Wrapper around any/all tasks to be executed when `gulp` is run.
 */
gulp.task( 'default', [ 'scripts' ], () => {
	console.log( 'INSIDE TASK: `default`' );
} );

/**
 * Wrapper around any/all script-related tasks.
 */
gulp.task( 'scripts', () => {
	return gulp.src( `${PATHS.src}/checkbox-master.js` )
		.pipe( babel( {
			presets: [ 'env' ],
		} ) )
		.pipe( gulp.dest( PATHS.dest ) );
} );
