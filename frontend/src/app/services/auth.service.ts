import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {jwtDecode} from 'jwt-decode';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logoutTimer: any;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(environment.apiUrl + '/auth/login', {
      email,
      password,
    }).pipe(
      tap((response) => {
        this.setSession(response.token, response.user);
      })
    );
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    const expirationTime = this.getTokenExpirationTime(token);
    if (expirationTime) {
      const expiresIn = expirationTime - Date.now();
      this.startLogoutTimer(expiresIn);
    }
  }

  private getTokenExpirationTime(token: string): number | null {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000; // Convert to milliseconds
    } catch {
      return null;
    }
  }

  private startLogoutTimer(expiresIn: number) {
    clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => this.logout(), expiresIn);
  }

  get isAdmin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get LoginIn() {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const expirationTime = this.getTokenExpirationTime(token);
    return expirationTime ? Date.now() > expirationTime : true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearTimeout(this.logoutTimer);
  }
  googleLogin(token: string) {
    return this.http.post<{ token: string; user: any }>(
      environment.apiUrl + "/auth/google-login",
      { token }
    ).pipe(
      tap((response) => {
        this.setSession(response.token, response.user);
      })
    );
  }
  

  get userName() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).name : null;
  }

  get userEmail() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).email : null;
  }
}
