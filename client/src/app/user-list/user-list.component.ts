import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users;
  @Output() destroyUserEvent = new EventEmitter();
  @Output() updateUserEvent = new EventEmitter();


  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  destroy(user: User) {
    this.destroyUserEvent.emit(user);
  }

  update(user: User) {
    this.updateUserEvent.emit(user);
  }

}
