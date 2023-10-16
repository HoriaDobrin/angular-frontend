import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { AddGameComponent } from './game/add-game/add-game.component';
import { HomeModule } from './home/home.module';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule, HomeModule, GameModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
