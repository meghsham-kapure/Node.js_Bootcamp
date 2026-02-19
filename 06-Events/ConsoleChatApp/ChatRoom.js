import EventEmitter from 'events';

class ChatRoom extends EventEmitter {
  constructor(name = 'NewChat') {
    super();

    this.name = name;
    this.chatUsers = new Set();

    this.on('9serAdded', (message) => {
      console.log(message);
    });

    this.on('userMessaged', (message) => {
      console.log(message);
    });

    this.on('userRemoved', (message) => {
      console.log(message);
    });
  }

  isUserPresent(user) {
    return this.chatUsers.has(user);
  }

  joinChat(user) {
    if (this.isUserPresent(user)) {
      this.emit('userAdded', `${user.username} already joined ${this.name}`);
      return;
    }

    this.chatUsers.add(user);
    this.emit('userAdded', `${user.username} has joined ${this.name}`);
  }

  leaveChat(user) {
    if (!this.isUserPresent(user)) {
      this.emit('userRemoved', `${user.username} is not present in ${this.name}`);
    } else {
      this.chatUsers.delete(user);
      this.emit('userRemoved', `${user.username} removed from ${this.name}`);
    }
  }

  sendMessage(user, message = '') {
    if (this.isUserPresent(user) && message != '') {
      this.emit('userMessaged', message, user.username);
    } else {
      this.emit('userMessaged', `Invalid message by ${user.username} in ${this.name} `);
    }
  }
}

export default ChatRoom;
