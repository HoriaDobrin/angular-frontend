import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { GameCardComponent } from './game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AddGameComponent, GameCardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, ReactiveFormsModule, RouterModule],
  exports: [GameCardComponent, MatIconModule],
})
export class GameModule {}
