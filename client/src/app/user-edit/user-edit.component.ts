import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;
  @Output() updateUserEvent = new EventEmitter();
  public userEdit: User;

  constructor(private _userService: UserService) { 
    this.userEdit = new User();
  }

  ngOnInit() {
    Object.assign(this.userEdit, this.user);
  }

  update() {
    this.userEdit.editable = false;
    //this.updateUserEvent.emit({original: this.user, edited: this.userEdit});
    this.updateUserEvent.emit(this.userEdit);
  }
}
