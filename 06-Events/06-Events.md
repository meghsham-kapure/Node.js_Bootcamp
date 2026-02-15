# Events

- NodeJS is built on an asynchronous, event-driven architecture.
- It follows a publisher and subscriber model where The subscriber (event listener or handler) listens for that event by the publisher.
- When an event occurs, it triggers specific processing and produces a response.

## Main Components

- Events
  - An event is an action or occurrence that triggers a specific response.
  - When an event happens, a function is executed to handle it.

- Event Emitters
  - Emit or trigger events.
  - Managed using the `EventEmitter` class from the `events` module. It is used to create and manage custom events in NodeJS and allows emitting events and attaching listeners to them.

- Event Listeners
  - Listen for specific events.
  - Execute a function when the event occurs.
  - Can be:
    - Single-callable: runs only once.
    - Multi-callable: runs every time the event is emitted.

## Understanding Event-Driven Architecture with an Analogy

- Think of an event-driven environment like a house, servants keep doing there work or seat ideal, when someone arrives, they ring the doorbell the servant hears the bell and opens the door. They does not repeatedly check the door to see if someone has arrived.

- In the same way, NodeJS does not continuously check for actions rather then it waits for an event to occur and when the event is triggered, the corresponding handler runs. This makes the system efficient and non-blocking.

## `liṅ/buv` library

- `libuv` is a C library used internally by NodeJS.
- It provides support for asynchronous and non-blocking operations.
- It is responsible for implementing the Event Loop in NodeJS.

### Responsibilities of `libuv`

- Manages the Event Loop.
- Handles the Thread Pool.
- Performs asynchronous file system operations.
- Manages network operations.
- Provides cross-platform support (Windows, Linux, macOS).

### Why It Is Important

- JavaScript in NodeJS runs on a single main thread.
- `libuv` allows NodeJS to perform heavy and I/O operations in the background.
- It makes NodeJS efficient and non-blocking.

## Why Use Events

- Events help in building asynchronous applications reducing tight coupling between different parts of the code and help avoid deeply nested callbacks (callback hell).
- Events are heavily used in real-time applications such as Chat applications, Notification systems and ive updates.
- Events are Internally used in NodeJS by many core modules in NodeJS use events internally, such as File System (fs), HTTP, Streams, these modules emit events to signal actions like data received, request completed, or file read.

```js
const EventEmitter = require('events');
const myEventEmitter = new EventEmitter();

// function that is executed on event
function sayingHello(user = { username: 'Default' }) {
  console.log(`Hello ${user.username}`);
}

// attaching function with event
myEventEmitter.on('sayHello', sayingHello);

// creating events with arguments
myEventEmitter.emit('sayHello', { username: 'Maverick' });
```

## Event Names in Production

- In production applications, event names are often stored in a separate constants file.
- This helps avoid value hard-coding, reduces typos and naming inconsistencies.
- It also makes event names easier to manage and update by centralizing event names improves maintainability and code clarity.

## EventEmitter Methods

- `on(eventName, listenerCallback)`
  - Registers a listener for the specified event.
  - The listener runs every time the event is emitted.

- `once(eventName, listenerCallback)`
  - Registers a listener that runs only one time.
  - After execution, the listener is automatically removed.

- `emit(eventName, ...args)`
  - Emits or triggers the specified event.
  - Passes arguments to the attached listeners.

- `removeListener(eventName, listenerCallback)`
  - Removes a specific listener for the given event.
  - The exact callback reference must be provided.

- `removeAllListeners()`
  - Removes all listeners for all events.

- `removeAllListeners(eventName)`
  - Removes all listeners associated with the specified event name.

- `.listeners(eventName)`
  - Give all listeners associated with the specified event name.

## operating on Events

```js
const EventEmitter = require('events');

const myEventEmitter = new EventEmitter();

// function that is executed on event
function sayingHello(user = { username: 'Default' }) {
  console.log(`Hello, ${user.username}`);
}

// attaching function with event
myEventEmitter.on('sayHello', sayingHello);

// creating events with arguments
myEventEmitter.emit('sayHello', { username: 'Maverick' });

const EventEmitter = require('events');
const myEventEmitter = new EventEmitter();

// function that is executed on event
function sayingHello(user = { username: 'Default', userId: 'Not Present' }) {
  console.log(`Hello, ${user.username} with userId:  ${user.userId}`);
}

// attaching function with event
myEventEmitter.once('sayHello', sayingHello);

// creating events with arguments
myEventEmitter.emit('sayHello', { userId: 1, username: 'Maverick' });
myEventEmitter.emit('sayHello', { userId: 2, username: 'Maverick' });
myEventEmitter.emit('sayHello', { userId: 3, username: 'Maverick' });
myEventEmitter.emit('sayHello', { userId: 4, username: 'Maverick' });
myEventEmitter.emit('sayHello', { userId: 5, username: 'Maverick' });
```

### Removing the listeners

```js
const eventEmitter = require('events');
const { EventEmitter } = require('stream');

const newEventEmitter = new EventEmitter();
const eventName = 'useAndThrow';

let eventCallback1 = () => console.log('I will be removed after first use.');
let eventCallback2 = () => console.log('I will not removed after use.');

newEventEmitter.on(eventName, eventCallback1);
newEventEmitter.on(eventName, eventCallback2);

console.log(newEventEmitter.listeners(eventName));
// [ [Function: eventCallback1], [Function: eventCallback2] ]

for (let i = 0; i < 5; i++) {
  newEventEmitter.emit('useAndThrow');
  i === 0 ? newEventEmitter.removeListener(eventName, eventCallback1) : null;
}

console.log(newEventEmitter.listeners(eventName));
// [ [Function: eventCallback2] ]

newEventEmitter.removeAllListeners();
console.log(newEventEmitter.listeners(eventName));
// []

newEventEmitter.emit('useAndThrow');
```

### Custom Events

```js
const EventEmitter = require('events');

class Chat extends EventEmitter {
  sendMessage(message) {
    console.log(`Message : "${message}" is Intercepted at sendMessage()`);
    console.log(`forwarding  to on() : ${message}`);
    this.emit('messageReceived', message);
  }
}

const chat1 = new Chat();

chat1.on('messageReceived', (message) => {
  console.log(`Message "${message}" is Received`);
});

const message = 'Hello';
console.log(`"${message}" is emitting`);
chat1.sendMessage(message);

/*

"Hello" is emitting
Message : "Hello" is Intercepted at sendMessage()
forwarding  to on() : Hello
Message "Hello" is Received

*/
```

### Error handling error

```js
const EventEmitter = require('events'); // class import

const eventEmitter = new EventEmitter(); //object creation

eventEmitter.on('error', (e) => {
  console.error(`Error Occurred : ${e.message}`);
});

eventEmitter.emit('error', new Error('Error custom message'));
```
