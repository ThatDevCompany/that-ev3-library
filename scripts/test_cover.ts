import {BuildUtils} from 'that-dev-library';
import 'rxjs/add/operator/mergeMap';

BuildUtils
	.exec('TESTING', 'nyc', [
		'--reporter', 'lcov',
		'--all', 'true',
		'--report-dir', './coverage',
		'--temp-directory', './coverage/tmp',
		'--exclude', 'src/**/*.spec.*',
		'--include', 'src/**/*',
		'node_modules/.bin/jasmine',
		'src/*.spec.js',
		'src/**/*.spec.js'
	])
	.mergeMap(() => BuildUtils
		.exec('SENDING TO CODECOV', 'codecov', [])
	)
	.subscribe();
