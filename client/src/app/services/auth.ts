import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  private apiUrl = 'https://taskflow-5uoj.onrender.com/api/auth';

  loggedIn = signal(false);

  constructor(private http: HttpClient) {
    this.loggedIn.set(this.isLoggedIn());
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }

  register( name: string,email: string,password: string) {

    return this.http.post(
      `${this.apiUrl}/register`,
      {
        name,
        email,
        password
      }
    );

  }

  saveToken(token: string): void {

    localStorage.setItem(
      this.tokenKey,
      token
    );

    this.loggedIn.set(true);

  }

  logout(): void {

    localStorage.removeItem(this.tokenKey);

    this.loggedIn.set(false);

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      this.tokenKey
    );

  }

  getToken(): string | null {

    return localStorage.getItem(
      this.tokenKey
    );

  }

}