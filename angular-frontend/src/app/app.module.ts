import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { GameModule } from './game/game.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/Interceptors/auth.interceptor';
import { AuthGuardClass } from './guards/auth.guard';
import { TokenResolver } from 'src/resolvers/auth.resolver';
import { AuthService } from 'src/Global Services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    GameModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuardClass,
    TokenResolver,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
