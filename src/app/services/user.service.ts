import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Assuming you're using Firebase Realtime Database

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {}

  // For example, saving additional user data to the database
  saveUserData(userId: string, data: any) {
    return this.db.object('/users/' + userId).set(data);
  }

  // Fetch user data from the database
  getUserData(userId: string) {
    return this.db.object('/users/' + userId).valueChanges();
  }

  // ... other methods related to user data management
}
