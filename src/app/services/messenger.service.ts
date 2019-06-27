import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  messengerState = new BehaviorSubject({
    addresat: null
  });
  constructor() { }
}
