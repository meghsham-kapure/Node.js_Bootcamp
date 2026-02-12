// // Example for  copy from one file and pest to other (override)
// const fileSystem = require('node:fs');
// const fileContents = fileSystem.readFileSync('./randomTextFile.txt', 'utf-8');
// fileSystem.writeFileSync('randomTextFileCopy.txt', fileContents, 'utf-8');
// console.log('Copied file');

// // Example for appending text to a file (adding)
// const fs = require('node:fs');
// const note = 'I am doing node JS course on udemy';
// const currentTimeStamp = new Date();
// const noteWithTimeStamp = `${currentTimeStamp.toLocaleDateString()} ${currentTimeStamp.toLocaleTimeString()} ${note}\n`;
// fs.appendFileSync('./myLogs.txt', noteWithTimeStamp, 'utf-8');

// // Example for checks if directory already exist if not the creates directory
// const fs = require('node:fs');
// if (!fs.existsSync('scr')) {
//   console.log('Creating file');
//   fs.mkdirSync('scr');
// } else {
//   console.log('Exists already');
// }

// // Example for creating the nested folder hierarchy
// const fs = require('node:fs');
//  fs.mkdirSync('./scr/dev/maverick', { recursive: true });

// // Example for deleting the directory and file inside it.
// const isRemovable = false;
// if (isRemovable) {
//   console.log('Deleting');
//   fs.rmdirSync('./scr'); // if file is not empty then throws error
//   fs.unlinkSync('./src/myLogs.txt'); // deletes file
// }
