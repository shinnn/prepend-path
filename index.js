'use strict';

const {inspect} = require('util');
const {delimiter, normalize} = require('path');

const getPathKey = require('path-key');

const pathKey = getPathKey();

module.exports = function prependPath(path) {
	if (typeof path !== 'string') {
		throw new TypeError(`Expected a path (<string>) to prepend to the existing \`${
			pathKey
		}\` environment variable, but got ${
			inspect(path)
		} instead.`);
	}

	process.env[pathKey] = `${normalize(path)}${delimiter}${process.env[pathKey]}`;

	return process.env[pathKey];
};
