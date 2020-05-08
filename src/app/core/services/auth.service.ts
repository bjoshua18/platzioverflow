import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urljoin from 'url-join';
import { User } from '../models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUrl: string;
  currentUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.usersUrl = urljoin(environment.url_api, 'auth');
    if (this.isLoggedIn()) {
      const { _id, firstName, lastName, email } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, firstName, lastName, _id);
    }
  }

  signup(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.usersUrl, 'signup'), user, { headers })
  }

  signin(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.usersUrl, 'signin'), user, { headers });
  }

  login = data => {
    const { _id, firstName, lastName, email } = data.user;
    this.currentUser = new User(
      email,
      null,
      firstName,
      lastName,
      _id
    );
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ _id, firstName, lastName, email }));
    this.router.navigateByUrl('/');
  }

  logout = () => {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
