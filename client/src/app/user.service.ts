import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './models/user.model';

import {ResponseOptions, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  /*
  getUsers() {
    return this._http.get('/api/users')
    .map(data => data.json())
    .toPromise();
  }

  getUser(user: User) {
    return this._http.get('/api/users/' + user._id)
    .map(data => data.json())
    .toPromise();
  }

  create(user: User) {
    return this._http.post('/api/users', user)
    .map(data => data.json())
    .toPromise();
  }

  update(user: User) {
    return this._http.put('/api/users/' + user._id, user)
    .map(data => data.json())
    .toPromise();
  }

  destroy(user: User) {
    return this._http.delete('/api/users/' + user._id)
    .map(data => data.json())
    .toPromise();
  }
  */

  private getOptions(): RequestOptions {
    const headers: Headers = new Headers();
    headers.append('content-type',
                  'application/json; charset=utf-8');
    const opts = new RequestOptions({headers: headers});
    opts.headers = headers;
    return opts;
  }

  getUsers(): Observable<User []> {
    return this._http.get('/api/users')
    .map(data => data.json());
  }

  getUser(user: User): Observable<User> {
    return this._http.get('/api/users/' + user._id)
    .map(data => data.json());
  }

  create(user: User): Observable<User> {
    return this._http.post('/api/users', user)
    .map(data => data.json());
  }

  update(user: User): Observable<User> {
    return this._http.put('/api/users/' + user._id, user)
    .map(data => data.json());
  }

  destroy(user: User): Observable<User> {
    return this._http.delete('/api/users/' + user._id)
    .map(data => data.json());
  }


}
