import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  public user: User;
  @Output() createUserEvent = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

  create() {
    this.createUserEvent.emit(this.user);
    this.user = new User();
  }

}
