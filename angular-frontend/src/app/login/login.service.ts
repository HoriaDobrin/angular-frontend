import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

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
        console.log('Verificat');
      },
      error: (error: HttpErrorResponse) => {
        throw alert('Invalid credentials');
      },
    });
  }
}
