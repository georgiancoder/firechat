import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  messengerState = new BehaviorSubject({ });

  constructor(public db: AngularFirestore) { }

  getAllUsers() {
    return this.db.collection('users').get();
  }
}
