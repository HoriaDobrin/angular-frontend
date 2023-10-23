import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  // Metoda pentru a verifica autentificarea
  async checkAuthentication(): Promise<boolean> {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return false; // Nu există token în local storage
    }

    // Faceți un request către backend pentru a verifica token-ul
    try {
      const response = await firstValueFrom(
        this.http.post<boolean>(apiBaseUrl + '/user/check-token', {
          accessToken,
        })
      );
      console.log(response);

      return response; // Verificarea a reușit
    } catch (error) {
      console.log('nu');

      return false; // Verificarea a eșuat
    }
  }
}
