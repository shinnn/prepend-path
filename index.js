'use strict';

var inspect = require('util').inspect;
var pathLib = require('path');

var delimiter = pathLib.delimiter;
var normalize = pathLib.normalize;

var getPathKey = require('path-key');

var pathKey = getPathKey();

module.exports = function prependPath(path) {
	if (typeof path !== 'string') {
		throw new TypeError(`Expected a path (<string>) to prepend to the existing \`${
			pathKey
		}\` environment variable, but got ${
			inspect(path)
		} instead.`);
	}

	process.env[pathKey] = normalize(path) + delimiter + process.env[pathKey];

	return process.env[pathKey];
};
