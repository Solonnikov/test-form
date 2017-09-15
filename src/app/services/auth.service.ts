import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/User';

@Injectable()
export class AuthService {

  constructor(public http: Http) { }

  register(user: User) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://jsonplaceholder.typicode.com/posts', user, {headers: headers})
      .map(res => res.json());
  }

  getData() {
    return this.http.get('../../assets/data/data.json')
      .map(res => res.json());
  }
}

