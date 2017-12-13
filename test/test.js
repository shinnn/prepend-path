'use strict';

const {delimiter} = require('path');

const crossSpawn = require('cross-spawn');
const getPathKey = require('path-key');
const prependPath = require('..');
const test = require('tape');

const originalPath = process.env[getPathKey()];

test('prependPath()', t => {
	t.plan(4);

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
		/^TypeError.*Expected a path \(<string>\) to prepend to the existing `PATH` environment/i,
		'should throw an error when '
	);

	t.throws(
		() => prependPath(new WeakMap()),
		/^TypeError.*Expected a path \(<string>\) .*, but got WeakMap {} instead\./,
		'should invalidate a non-string argument.'
	);
});
