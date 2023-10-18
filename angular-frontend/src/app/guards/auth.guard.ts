import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService {
  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please log in to access this page');
      return false;
    }
    return true;
  }
}
