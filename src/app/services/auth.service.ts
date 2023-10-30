import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserService } from './user.service'; // Import UserService
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<firebase.User | null>(null);
  public user = this.currentUserSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth, 
    private userService: UserService  // Inject UserService
  ) {     
    this.afAuth.authState.subscribe(user => {
    this.currentUserSubject.next(user);});
  }

  getCurrentUser(): firebase.User | null {
    return this.currentUserSubject.value;
  }

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

  async getUser() {
    return this.afAuth.currentUser;
  }

  signOut(): void {
    console.log('signing out');
    this.afAuth.signOut();
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
