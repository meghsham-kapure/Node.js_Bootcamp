# NodeJS

## Introduction

- JavaScript was originally developed to create dynamic web pages along with HTML and CSS
- It was designed to run only inside the browser using a JavaScript engine
- Google made the Chrome browser’s JavaScript engine open-source (V8 engine)
- Ryan Dahl used the V8 engine to build a runtime environment that allows JavaScript to run outside the browser
- This runtime environment is called NodeJS
- NodeJS runs JavaScript on the machine using C++ bindings and system-level APIs

## Installation

## Downloading NodeJS

- Go to [https://nodejs.org/](https://nodejs.org/)
- Even-numbered versions are stable. Odd-numbered versions are development releases
- These versions are maintained by the Node team
- Download the version you need
- For learning purposes, you can use the latest version but for production, use a stable and LTS version is recommended

## JavaScript File in NodeJS

### Run code

- To run / execute a JavaScript file using NodeJS, use the following command:

```
node filename.js
```

- This command makes NodeJS parse, compile, and execute the JavaScript code written inside the file.
- The file must have a `.js` extension.
- The command should be executed from the terminal in the directory where the file is located.

### Auto Restart While Editing Code using the Watch Flag

- When you make changes to a file, you normally need to run the command again to see updates.
- To automate this process, you can use the `--watch` flag.
- The `--watch` flag automatically restarts the program whenever you save changes.

```
node --watch filename.js
```

- NodeJS will monitor the file for changes.
- When the file is saved, it automatically restarts and runs the updated code.
- When done use `control + c` to exit execution loop or simply close the terminal.

## NPM

- NPM stands for Node Package Manager.
- It is used to install and manage packages (libraries) in a NodeJS project.
- NPM is automatically installed when you install NodeJS.
- Just like NodeJS, NPM also provides various flags and options to manage projects more efficiently.
- These flags help control how packages are installed and managed.

### Installing a Package

- To install a library in your project, use:

```
npm install libraryName

# Shortcut command:
npm i libraryName
```

- This command downloads the package, adds it to the project and updates the `package.json` file (if initialized)

## JavaScript Behaviors in Browser vs NodeJS

- JavaScript behaves differently in the browser and in NodeJS because both run in different environments. The core language remains the same, but the available APIs are different. In some cases, behavior may also vary based on the environment.
- In the browser, JavaScript has access to the `window` object, web API, the `document` object, and the DOM model that builds and represents the web page. It is mainly used for UI development and runs inside the browser environment. It does not have access to system or OS resources and cannot directly access the file system.
- In NodeJS, JavaScript runs in a server-side environment and provides a global object instead of the `window` object. It allows access to the file system and other OS-level features. NodeJS is mainly used for backend development.\* APIs like `setTimeout` and `setInterval` are available in both environments.
- APIs like setTimeout and setInterval are available in both environments. They exist in both the browser and NodeJS because they are implemented separately for each environment.Although they behave similarly, their internal implementation is different.
