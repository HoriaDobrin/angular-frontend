import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Ia token-ul de autentificare din localStorage
    const token = localStorage.getItem('access_token');
    console.log(token);
    
    // Clonează cererea originală pentru a nu o modifica direct
    let authReq = req;

    // Dacă există un token, adaugă-l în antetul cererii
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Trimiterea cererii către următorul interceptor sau backend
    return next.handle(authReq);
  }
}
