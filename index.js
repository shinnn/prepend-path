'use strict';

const {inspect} = require('util');
const {delimiter, normalize} = require('path');

const getPathKey = require('path-key');

const ARG_ERROR_MESSAGE = 'Expected 1 argument (<string>)';
const pathKey = getPathKey();

module.exports = function prependPath(...args) {
	const argLen = args.length;

	if (argLen === 0) {
		const error = new RangeError(`${ARG_ERROR_MESSAGE}, but got none.`);
		error.code = 'ERR_MISSING_ARGS';

		throw error;
	}

	if (argLen !== 1) {
		throw new RangeError(`${ARG_ERROR_MESSAGE}, but got ${argLen} arguments.`);
	}

	const [path] = args;

	if (typeof path !== 'string') {
		const error = new TypeError(`Expected a path (<string>) to prepend to the existing \`${
			pathKey
		}\` environment variable, but got ${
			inspect(path)
		} instead.`);
		error.code = 'ERR_INVALID_ARG_TYPE';

		throw error;
	}

	process.env[pathKey] = `${normalize(path)}${delimiter}${process.env[pathKey]}`;

	return process.env[pathKey];
};
