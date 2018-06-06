import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: Array<User> = [];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  /* PROTOTYPE (NO BACKEND)
  getUsers() {
    return this.users;
  }

  getUser(user: User) {
  }

  create(user: User) {
    this.users.push(user);
  }

  update(user: any) {
    let i = this.users.indexOf(user.original);
    this.users[i] = user.edited;
  }

  destroy(user: User) {
    let i = this.users.indexOf(user);
    this.users.splice(i, 1);
  }
  */

  /*
  // Using Promises
  create(user: User) {
    this._userService.create(user)
    .then(res => this.getUsers())
    .catch(err => console.log(err));
  }

  update(user: User) {
    this._userService.update(user)
    .then(res => this.getUsers())
    .catch(err => console.log(err));
  }

  destroy(user: User) {
    this._userService.destroy(user)
    .then(res => this.getUsers())
    .catch(err => console.log(err));
  }

  getUsers() {
    this._userService.getUsers()
    .then(users => this.users = users)
    .catch(err => console.log(err));
  }
  */

  /*
  getUser(user: User) {
    this._userService.getUser(user)
    .then(res => res.json(user))
    .catch(err => console.log(err));
  }
  */

  // Using Observables
  getUsers() {
    this._userService.getUsers()
    .subscribe(users => this.users = users);
  }

  create(user: User) {
    this._userService.create(user)
    .subscribe(status => this.getUsers());
  }

  update(user: User) {
    this._userService.update(user)
    .subscribe(status => this.getUsers());
  }

  destroy(user: User) {
    this._userService.destroy(user)
    .subscribe(status => this.getUsers());
  }
}
