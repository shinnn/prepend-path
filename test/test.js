'use strict';

const {delimiter} = require('path');
const {execFile} = require('child_process');
const {promisify} = require('util');

const getPathKey = require('path-key');
const prependPath = require('..');
const test = require('tape');

const originalPath = process.env[getPathKey()];

test('prependPath()', async t => {
	t.equal(
		prependPath(__dirname),
		`${__dirname}${delimiter}${originalPath}`,
		'should return a modified PATH environment variable value.'
	);

	t.equal(
		(await promisify(execFile)('node', [
			'-e',
			'console.error(\'This code should not be executed.\');'
		], {
			shell: process.platform === 'win32'
		})).stderr,
		'',
		'should prepend a path to the PATH.'
	);

	t.throws(
		() => prependPath(),
		/^RangeError: Expected 1 argument \(<string>\), but got none\./u,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => prependPath('a', 'b'),
		/^RangeError: Expected 1 argument \(<string>\), but got 2 arguments\./u,
		'should throw an error when it takes too many arguments.'
	);

	t.throws(
		() => prependPath(new Int32Array()),
		/^TypeError.*Expected a path \(<string>\) .*, but got Int32Array \[\] instead\./u,
		'should invalidate a non-string argument.'
	);

	t.end();
});
