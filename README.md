# prepend-path

[![npm version](https://img.shields.io/npm/v/prepend-path.svg)](https://www.npmjs.com/package/prepend-path)
[![Build Status](https://travis-ci.org/shinnn/prepend-path.svg?branch=master)](https://travis-ci.org/shinnn/prepend-path)
[![Build status](https://ci.appveyor.com/api/projects/status/h8qwn7njkrds617j/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/prepend-path/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/prepend-path.svg)](https://coveralls.io/github/shinnn/prepend-path?branch=master)

Prepend a path to the existing [`PATH`](http://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03) environment variable cross-platform way

```javascript
const prependPath = require('prepend-path');

process.env.PATH; //=> '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

prependPath('additional/bin');

process.env.PATH; //=> 'additional/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install prepend-path
```

## API

```javascript
const prependPath = require('prepend-path');
```

### prependPath(*path*)

*path*: `string` (a path to prepend)  
Return: `string` (modified `PATH` environment variable)

It prepends the given *path* to the [`process.env.PATH`](https://nodejs.org/api/process.html#process_process_env), or [its equivalent on Windows](https://stackoverflow.com/questions/7199039/file-paths-in-windows-environment-not-case-sensitive/7199074#7199074) for example `process.env.Path`, along with [the platform-specific path delimiter](https://nodejs.org/api/path.html#path_path_delimiter).

```javascript
prependPath('foo/bar');
// POSIX
//=> 'foo/bar:/usr/local/bin:/usr/bin:/bin:...'

// Windows
//=> 'foo\\bar;C:\\Users\\appveyor\\AppData\\Roaming\\npm;C:\\...'
```

Prepending a new path to the `PATH` is, in other words, making it precedent to the every existing one while searching executable files.

```javascript
const {existsSync} = require('fs');
const which = require('which');

existsSync('/User/example/new_path/npm/bin/npm'); //=> true

which.sync('npm'); //=> '/usr/local/bin/npm'
prependPath('/User/example/new_path/npm/bin');
which.sync('npm'); //=> '/User/example/new_path/npm/bin/npm'
```

## License

[ISC License](./LICENSE) © 2017 Shinnosuke Watanabe
