import User from './User.js';
import ChatRoom from './ChatRoom.js';

const user1 = new User('Alpha', 'alpha@maverick.com', 29, true);
const user2 = new User('Beta', 'beta@maverick.com', 26, false);
const user3 = new User('Gamma', 'gamma@maverick.com', 27, true);
const user4 = new User('Sigma', 'sigma@maverick.com', 25, false);

const chatRoom1 = new ChatRoom('Group-1');
chatRoom1.joinChat(user1);
chatRoom1.joinChat(user2);
chatRoom1.sendMessage(user1, 'Hi');
chatRoom1.sendMessage(user2, 'Hello');
chatRoom1.sendMessage(user3, 'Hi');
chatRoom1.leaveChat(user2);

const chatRoom2 = new ChatRoom('Group-2');
chatRoom2.joinChat(user3);
chatRoom2.joinChat(user4);
chatRoom2.sendMessage(user3, 'Hi');
chatRoom2.sendMessage(user4, 'Hello');
chatRoom2.sendMessage(user1, 'Hi');
