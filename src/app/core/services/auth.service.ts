import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urljoin from 'url-join';
import { User } from '../models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUrl: string;
  currentUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
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
    this.router.navigateByUrl('/signin');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: { name }, message } = error;
    let msg = 'Ha ocurrido un error. Inténtalo nuevamente.';
    switch (name) {
      case 'TokenExpiredError':
        msg = 'Tu sesión ha expirado';
        break;
      case 'JsonWebTokenError':
        msg = 'Ha habido un problema con tu sesión';
        break;
    }
    this.showError(msg);
    this.logout();
  }
}
