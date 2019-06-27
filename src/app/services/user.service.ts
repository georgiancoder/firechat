import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class UserService {
  userData = new BehaviorSubject<any>(
    {
      created_at: 0,
      email: '',
      emailVerified: false,
      firstName: '',
      id: '',
      lastName: '',
      photoURL: '',
      uid: '',
      updated_at: 0
    });
  newPassword = new BehaviorSubject<string>('');
  userDetails;

  constructor(public db: AngularFirestore) {
  }

  async getUser(user) {
    if (user) {
      this.userDetails = await this.db.firestore.collection('users').where('uid', '==', user.uid);
      this.userDetails.onSnapshot((details) => {
        console.log(details);
        this.userData.next({email: user.email, emailVerified: user.emailVerified, ...this.userDetails});
      });
      localStorage.setItem('user', JSON.stringify(user));
      return {email: user.email, emailVerified: user.emailVerified, ...this.userDetails};
    } else {
      localStorage.setItem('user', null);
    }
  }

  setUserDetails(userData) {
    this.userDetails.phone = userData.phone ? userData.phone : this.userDetails.phone;
    this.userDetails.skype = userData.skype ? userData.skype : this.userDetails.skype;
    this.userDetails.lastName = userData.lastName ? userData.lastName : this.userDetails.lastName;
    this.userDetails.firstName = userData.firstName ? userData.firstName : this.userDetails.firstName;
    this.userDetails.photoURL = userData.photoURL ? userData.photoURL : this.userDetails.photoURL;
    this.userDetails.countryId = userData.countryId ? userData.countryId : this.userDetails.countryId;
    return this.userDetails.save();
  }

}
