export interface User {
    _id?: string;
    username: string;
    password: string;
    email: string;
    profile?: any;
    achievements?: any[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export class User {
    constructor(userData: any) {
      this.username = userData.username;
      this.password = userData.password;
      this.email = userData.email;
      this.profile = userData.profile;
      this.achievements = userData.achievements;
    }
  }