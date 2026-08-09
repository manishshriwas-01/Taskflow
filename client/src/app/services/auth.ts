import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  loggedIn = signal(false);

  constructor() {
    this.loggedIn.set(
      this.isLoggedIn()
    );
  }

  login(username: string, password: string): boolean {

    if (username === 'admin@gmail.com' && password === '12345678') {

      localStorage.setItem(this.tokenKey, 'taskflow-token');
      this.loggedIn.set(true);

      return true;

    }

    return false;

  }

  logout() {

    localStorage.removeItem(this.tokenKey);
    this.loggedIn.set(false);

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(this.tokenKey);

  }

  getToken() {

    return localStorage.getItem(this.tokenKey);

  }

}