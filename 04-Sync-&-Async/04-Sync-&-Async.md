# Synchronous and Asynchronous Code

## Synchronous Code

- Synchronous code is blocking in nature.
- It waits until the current operation is completed before moving to the next line.
- Execution happens step by step in sequence.
- In the `fs` module, methods with the `Sync` postfix are synchronous operations.
- These methods complete the task first, then return the result.
- While a synchronous operation is running, no other code executes.

# Synchronous Version

```js
const fs = require('node:fs');

function showFileContent(content) {
  console.log(`Content in file length is : ${content.length}`);
}

function showError(error) {
  console.log(`Error while reading code : \n ${error}`);
}

function readFileSyncVersion(filePath) {
  console.log(`\nStarted Reading file ${filePath}`);
  const startTime = Date.now();

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    showFileContent(content);
  } catch (error) {
    showError(error.message);
  }

  const timeElapsed = Date.now() - startTime;
  console.log(`Completed Reading file ${filePath} in ${timeElapsed} milliseconds\n`);
}

readFileSyncVersion('./assets/text/lorem1.html');
readFileSyncVersion('./assets/text/lorem2.html');
readFileSyncVersion('./assets/text/lorem3.html');
```

Behavior

- Each file is read one after another.
- The next file starts only after the previous one finishes.

## Asynchronous Code

- Asynchronous code is non-blocking in nature.
- It does not wait for an operation to complete before moving to the next line.
- Execution continues while the operation runs in the background.
- In the `fs` module, methods without the `Sync` postfix are asynchronous.
- These methods usually use callbacks, promises, or async/await to handle results.
- They improve performance when handling tasks like file operations, network requests, or database queries.

### Asynchronous Version Using Promises

```js
const fs = require('node:fs').promises;

function showFileContent(content) {
  console.log(`Content in file length is : ${content.length}`);
}

function showError(error) {
  console.log(`Error while reading code : \n ${error}`);
}

async function readFileAsyncVersion(filePath) {
  console.log(`\nStarted Reading file ${filePath}`);
  const startTime = Date.now();

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    showFileContent(content);
  } catch (error) {
    showError(error.message);
  }

  const timeElapsed = Date.now() - startTime;
  console.log(`Completed Reading file ${filePath} in ${timeElapsed} milliseconds\n`);
}

readFileAsyncVersion('./assets/text/lorem1.html');
readFileAsyncVersion('./assets/text/lorem2.html');
readFileAsyncVersion('./assets/text/lorem3.html');
```

Behavior

- All file reads start almost at the same time.
- Execution does not block while waiting for file reading to complete.
