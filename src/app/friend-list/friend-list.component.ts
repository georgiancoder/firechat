import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessengerService} from '../services/messenger.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  @Input() users;
  constructor(public messengerService: MessengerService) { }

  selectUser(user) {
    this.messengerService.messengerState.next({
      to: user
    });
  }

  ngOnInit() {
  }

}
