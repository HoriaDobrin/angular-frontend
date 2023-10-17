import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GameModule } from '../game/game.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, GameModule],
  exports: [HomeComponent],
})
export class HomeModule {}
