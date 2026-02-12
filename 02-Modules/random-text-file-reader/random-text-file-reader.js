// Example for  copy from one file and pest to other (override)
const fileSystem = require('node:fs');
const fileContents = fileSystem.readFileSync('./randomTextFile.txt', 'utf-8');
fileSystem.writeFileSync('randomTextFileCopy.txt', fileContents, 'utf-8');
console.log('Copied file');
