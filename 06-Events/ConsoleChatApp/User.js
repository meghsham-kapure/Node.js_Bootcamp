class User {
  constructor(username, emailId, age, isVerified) {
    this.username =
      username ?? `User_${String(Math.floor(Math.random() * 100000 + 1)).padStart(6, '0')}`;
    this.email = emailId;
    this.age = age;
    this.isVerified = isVerified;
  }
}

export default User;
