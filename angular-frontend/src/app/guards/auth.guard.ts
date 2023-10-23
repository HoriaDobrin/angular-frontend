import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Global Services/auth.service';
import { TokenResolver } from 'src/resolvers/auth.resolver';

@Injectable()
export class AuthGuardClass {
  constructor(private authServide: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    // const token = localStorage.getItem('access_token');
    // if (!token) {
    //   alert('Please log in to access this page');
    //   return false;
    // }
    // return true;
    // return true;

    const isGood = await this.authServide.checkAuthentication();

    if (isGood) {
      return true;
    } else {
      this.router.navigate(['/login']);
      throw new Error('Invalid token');
    }
    // return this.authServide.checkAuthentication();
  }
}
