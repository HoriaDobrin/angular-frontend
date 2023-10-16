import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

    // if(data){
    //   console.log('');
    // }else{
    //   throw alert('Invalid credentials');
    // }

    this.http.post(apiBaseUrl + '/user/login', userObj).subscribe({
      next: (data) => {
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        throw alert('Invalid credentials');
      },
    });
  }
}
