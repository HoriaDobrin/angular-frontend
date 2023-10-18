import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GameModule } from '../game/game.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, GameModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
})
export class HomeModule {}
