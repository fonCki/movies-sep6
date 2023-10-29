import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase';
import { UserService } from './user.service'; // Import UserService


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth, 
    private userService: UserService  // Inject UserService
  ) {}

  async signInWithGoogle() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
  }
  
  async signInWithFacebook() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    if (credential.user) { // Check if user is non-null
      // await this.updateUserData(credential.user);
    }
    return credential;
  }
  


  async signInWithTwitter() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    if (credential.user) { // Check if user is non-null
      // await this.updateUserData(credential.user);
    }
    return credential;
  }
  

  async signUpWithEmail(email: string, password: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (credential.user) { // Check if user is non-null
      // await this.updateUserData(credential.user);
    }
    return credential;
  }

  async loginWithEmail(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    if (credential.user) { // Check if user is non-null
      // await this.updateUserData(credential.user);
    }
    return credential;
  }

  async signOut() {
    console.log('signing out');
    return this.afAuth.signOut();
  }

  async isLogged() {
    return this.afAuth.authState;
  }

  private async updateUserData(user: firebase.User) {
    // Structure the user data as you need it. This is just an example:
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    // Use UserService to save the user data
    await this.userService.saveUserData(user.uid, userData);
  }


}
