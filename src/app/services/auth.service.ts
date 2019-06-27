import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { mergeMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore,
    private userService: UserService
  ) {
    this.afAuth.authState.pipe(
      mergeMap(value => this.userService.getUser(value))
    ).subscribe(res => {
      this.userService.userData.next(res);
    });
  }



  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign up with email/password
  SignUp(userData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then((result) => {
        this.SendVerificationMail();
        this.registerUserData(result.user, userData).then((value => {
          console.log(value);
        })).catch(err => {
          console.log(err);
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  registerUserData(user, userData) {
    const userDetails = {
      uid: user.uid,
      photoURL: user.photoURL ? user.photoURL : '',
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: new Date(`${userData.day},${userData.month},${userData.year}`),
      gender: userData.gender
    };
    return this.db.collection('users').doc(user.uid).set(userDetails);
  }

  reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['pages', 'verify-email']);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['pages/login']);
    });
  }
}
