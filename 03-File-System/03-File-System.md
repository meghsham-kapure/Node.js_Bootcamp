# NodeJS File System Functions Used

All the following functions belong to the built-in `node:fs` module.

1. `fs.readFileSync(path, encoding)` : Reads the content of a file synchronously. The program waits until the file is fully read before continuing execution.

2. `fs.writeFileSync(path, data, encoding)` : Writes data to a file synchronously. If the file already exists, it overwrites the existing content.

```js
// Example for  copy from one file and pest to other (override)
const fileSystem = require('node:fs');
const fileContents = fileSystem.readFileSync('./randomTextFile.txt', 'utf-8');
fileSystem.writeFileSync('randomTextFileCopy.txt', fileContents, 'utf-8');
console.log('Copied file');
```

3. `fs.appendFileSync(path, data, encoding)` : Adds data to the end of a file synchronously. If the file does not exist, it creates a new file.

```js
// Example for appending text to a file (adding)
const fs = require('node:fs');
const note = 'I am doing node JS course on udemy';
const currentTimeStamp = new Date();
const noteWithTimeStamp = `${currentTimeStamp.toLocaleDateString()} ${currentTimeStamp.toLocaleTimeString()} ${note}\n`;
fs.appendFileSync('./myLogs.txt', noteWithTimeStamp, 'utf-8');
```

4. `fs.existsSync(path)` : Checks synchronously whether a file or directory exists. Returns a boolean value.

```js
// Example for checks if directory already exist if not the creates directory
const fs = require('node:fs');
if (!fs.existsSync('scr')) {
  console.log('Creating file');
  fs.mkdirSync('scr');
} else {
  console.log('Exists already');
}
```

5. `fs.mkdirSync(path, options)` : Creates a new directory synchronously. The `recursive` option allows creating nested directories.

```js
// Example for creating the nested folder hierarchy
const fs = require('node:fs');
fs.mkdirSync('./scr/dev/maverick', { recursive: true });
```

6. `fs.rmdirSync(path)` : Removes a directory synchronously. It throws an error if the directory is not empty (unless specific options are provided).

7. `fs.unlinkSync(path)` : Deletes a file synchronously from the file system.

```js
// Example for deleting the directory and file inside it.
const fs = require('node:fs');
const isRemovable = false;
if (isRemovable) {
  console.log('Deleting');
  fs.rmdirSync('./scr'); // if file is not empty then throws error
  fs.unlinkSync('./src/myLogs.txt'); // deletes file
}
```
