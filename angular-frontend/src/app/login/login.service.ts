import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from './authResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string) {
    const userObj = {
      email,
      password,
    };

    this.http.post<AuthResponse>(apiBaseUrl + '/user/login', userObj).subscribe({
      next: (data: { accessToken: string }) => {
        localStorage.setItem('access_token', data.accessToken)
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        throw alert('Invalid credentials');
      },
    });
  }
}
