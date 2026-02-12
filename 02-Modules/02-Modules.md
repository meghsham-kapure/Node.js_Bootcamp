# Modules

## Introduction

- A module is a set of code that provides specific functionality.
- It can be imported and used inside another module.
- Modules help keep code clean and easier to read.
- They improve code organization and maintainability.

## Types of Modules

### 1. Internal or Built-in Modules

- Provided by the environment (for example, NodeJS).
- No installation is required.
- Usually imported directly when needed.

### 2. External or Third-Party Modules

- Created and published by other developers.
- Must be installed using a package manager like NPM.
- Imported into the project where required.

### 3. Custom or User-Defined Modules

- Created by the developer for a specific use case.
- Can import and use both internal and external modules.
- Used to organize project-specific logic.

# Importing Modules

## CommonJS in NodeJS

- In NodeJS, the default module system is CommonJS.
- Modules are imported using the `require()` function like `require('moduleName')`

### How NodeJS Resolves Modules

When importing a module, NodeJS searches in the following order:

1. It checks if a specific file path is provided. If the file exists at that path, it imports it.
2. It checks inside the `node_modules` folder for installed third-party libraries. If found, it imports the package from there.
3. It checks for built-in NodeJS modules provided by the environment. If available, it loads the internal module.
4. If the module is not found in any of the above locations, NodeJS throws an error.

## Wrapper Function and Program Entry

### Module Wrapper Function

- In NodeJS, every file is wrapped inside a function before execution.
- When a module is successfully imported using `require()`, its code is placed inside a wrapper function.
- This wrapper function provides special variables to the module.

The wrapper function looks like this internally:

```
(function (exports, require, module, __filename, __dirname) {
  // code inside the file
})
```

### Purpose of the Wrapper

- `exports` is used to export values from the module.
- `require` is used to import other modules.
- `module` contains metadata about the current module.
- `__filename` gives the full path of the current file.
- `__dirname` gives the directory path of the current file.

### Program Execution

- NodeJS wraps the file content inside this function.
- It then calls the wrapper function to execute the code.
- This is how each module runs in its own scope instead of the global scope.

### Example: Reading a File in Node.js

1.  Create Files

- Create a JavaScript file and text file with some text inside in it

2. In the JS code
1. Import `fs` Module using `fs` (File System) which is a built-in Node.js module used to work with files.
1. Use `readFileSync(fileLocation , encodingFormat)` to read file data synchronously.
1. Read File Content

```js
const fs = require('fs');
const fileContents = fs.readFileSync('randomTextFile.txt', 'utf-8');
console.log(fileContents);
```

Here `require('fs')` imports the File System module. `readFileSync()` reads the file immediately (blocking operation) with `'utf-8'` which converts file buffer into readable string and `console.log()` → prints file content in terminal

3.  Run the Program `node --watch filename.js`

## Installing Packages

1. package.json

- When a NodeJS project is created, it contains a `package.json` file.
- This file acts as the configuration file for the project.
- It stores:
  - Project metadata
  - Scripts
  - Dependencies
  - Dev dependencies
- It is usually created using `npm init`
- The file is located in the root directory of the project.

2. package-lock.json

- The `package-lock.json` file is automatically generated when you install packages.
- It records the exact versions of all installed dependencies, including nested dependencies.
- It ensures that the same dependency tree is installed across different machines.
- It improves installation speed by using cached data.
- Unlike `node_modules`, this file should be tracked in Git.

3.  Installing Dependencies

- To install a package from the NPM registry which is on the Internet use `npm install packageName ` or `npm i packageName`
- Installed packages are stored inside the `node_modules` folder in the root directory.
- To install a package as a development dependency use `npm install packageName -D`. Dev dependencies are used only during development and not required in production.

4. `node_modules` and Version Control

- The `node_modules` folder contains all installed packages.
- It is reproducible using `package.json` and `package-lock.json`.
- It is generally not tracked in Git.
- Dependencies are reinstalled during deployment.

5. Module Import Paths in NodeJS

- When importing a module from your own project (Custom Project Files), the path starts with `./` or `../`.
  - ./ refers to the current directory.
  - ../ refers to the parent directory.
  - ./directoryName refers to a folder inside the current directory with the matching name.

- Importing Built-in NodeJS Modules
  - When importing a built-in NodeJS module, you can prefix it with `node:` like `require('node:fs')`. This explicitly tells NodeJS that the module is a core module.
  - As this is newer syntax, it is might optional but recommended for clarity node be compatible with older Node version.
