import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/Global Services/auth.service';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenResolver {
  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('Called the resolver here', route);
    console.log(this.authService.checkAuthentication());
    console.log('Boss?');

    return this.authService.checkAuthentication();
  }
}

export const TokenRes: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authService: AuthService = inject(AuthService)
): Promise<boolean> => {
  return authService.checkAuthentication();
};
