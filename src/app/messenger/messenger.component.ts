import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessengerService} from '../services/messenger.service';
import { takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, OnDestroy {
  componentActive = true;
  users = [];
  constructor(private messengerService: MessengerService) { }

  ngOnInit() {
    this.messengerService.getAllUsers().pipe(
      takeWhile( val => this.componentActive )
    ).subscribe(val => {
      val.docs.forEach(value => {
        this.users.push(value.data());
      });
    });

    this.messengerService.messengerState.pipe(
      takeWhile(value => this.componentActive)
    ).subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
