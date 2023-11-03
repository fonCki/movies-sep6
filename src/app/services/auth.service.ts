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
    private userService: UserService,  // Inject UserService

  ) {     
    this.afAuth.authState.subscribe(user => {
    this.currentUserSubject.next(user);});
  }

  getCurrentUser(): firebase.User | null {
    return this.currentUserSubject.value;
  }

  async signInWithGoogle() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (credential.user) { // Check if user is non-null
      console.log("user created");
      console.log(credential.user);
    //   await this.updateUserData(credential.user);
    }
    return credential;
  }
  
  async signInWithFacebook() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    return credential;
  }
  
  async signInWithTwitter() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    return credential;
  }

  async signInWithGithub() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    return credential;
  }

  async signInWithLinkedIn() {
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('linkedin.com'));
    return credential;
  }
  

  //create user with email, password, name, and photo
  async signUpWithEmail(email: string, password: string, name: string, lastName: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
       this.updateProfile(name + " " + lastName);
    });
    return credential;
  }
  

  async loginWithEmail(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
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


  async updateProfile(displayName: string) {
    const profile = {
        displayName: displayName,
        uid: 1111
        
    }
    const currentUser = await this.afAuth.currentUser;
        if (currentUser) {
          return currentUser.updateProfile(profile).then(() => {
            console.log('User profile updated successfully');
            console.log(currentUser);
          }
          ).catch(error => {
            console.log(error);
          }
          );
        }
      }

}
