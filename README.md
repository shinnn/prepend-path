# prepend-path

[![npm version](https://img.shields.io/npm/v/prepend-path.svg)](https://www.npmjs.com/package/prepend-path)
[![Build Status](https://travis-ci.org/shinnn/prepend-path.svg?branch=master)](https://travis-ci.org/shinnn/prepend-path)
[![Build status](https://ci.appveyor.com/api/projects/status/t75b3ps73337xpra/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/prepend-path/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/prepend-path.svg)](https://coveralls.io/github/shinnn/prepend-path?branch=master)

Prepend a path to the existing [`PATH`](http://pubs.opengroup.org/onlinepubs/000095399/basedefs/xbd_chap08.html#tag_08_03) environment variable cross-platform way

```javascript
const prependPath = require('prepend-path');

process.env; //=> '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

prependPath('additional/bin');

process.env; //=> 'additional/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
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

It prepends the given *path* to the `PATH` environment variable, or its equivalent on Windows for exmaple `Path`, along with [the platform-specific path delimiter](https://nodejs.org/api/path.html#path_path_delimiter).

```javascript
prependPath('foo/bar');
// POSIX
//=> 'foo/bar:/usr/local/bin:/usr/bin:/bin:...'

// Windows
//=> 'foo\\bar;C:\\Users\\appveyor\\AppData\\Roaming\\npm;C:\\...'
```

Prepending a new path to the `PATH` is, in other words, making the path precedent to every existing ones while searching executable files.

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
