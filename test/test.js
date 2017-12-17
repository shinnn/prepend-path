'use strict';

const {delimiter} = require('path');

const crossSpawn = require('cross-spawn');
const getPathKey = require('path-key');
const prependPath = require('..');
const test = require('tape');

const originalPath = process.env[getPathKey()];

test('prependPath()', t => {
	t.plan(5);

	t.equal(
		prependPath(__dirname),
		`${__dirname}${delimiter}${originalPath}`,
		'should return a modified PATH environment variable value.'
	);

	crossSpawn('node', ['-e', 'throw(new Error(\'This code should not be executed.\'))'])
	.on('error', t.fail)
	.on('exit', code => {
		t.equal(code, 0, 'should prepend a path to the PATH.');
	});

	t.throws(
		() => prependPath(),
		/^RangeError: Expected 1 argument \(<string>\), but got none\./,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => prependPath('a', 'b'),
		/^RangeError: Expected 1 argument \(<string>\), but got 2 arguments\./,
		'should throw an error when it takes too many arguments.'
	);

	t.throws(
		() => prependPath(new WeakMap()),
		/^TypeError.*Expected a path \(<string>\) .*, but got WeakMap {} instead\./,
		'should invalidate a non-string argument.'
	);
});
