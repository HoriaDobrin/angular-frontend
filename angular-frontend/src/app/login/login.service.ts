import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from './authResponse.interface';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/login-credentials.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  signIn(userCredentials: UserCredentials) {
    this.http
      .post<AuthResponse>(apiBaseUrl + '/user/login', userCredentials)
      .subscribe({
        next: (data: { accessToken: string }) => {
          localStorage.setItem('access_token', data.accessToken);
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          throw alert('Invalid credentials');
        },
      });
  }

  checkToken(): Observable<boolean> {
    return this.http.post<boolean>(
      apiBaseUrl + '/user/check-token',
      localStorage.getItem('access_token')
    );
  }
}
