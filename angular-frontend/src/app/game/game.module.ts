import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { GameCardComponent } from './game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';
import { TokenRes, TokenResolver } from 'src/resolvers/auth.resolver';
import { UpdateGameComponent } from './update-game/update-game.component';

const routes: Routes = [
  // { path: '', component: GameCardComponent },
  {
    path: 'add-game',
    component: AddGameComponent,
    resolve: { TokenRes },
  },
  {
    path: 'update-game/:id',
    component: UpdateGameComponent,
    resolve: { TokenRes },
  },
];

@NgModule({
  declarations: [AddGameComponent, GameCardComponent, UpdateGameComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NavBarComponent,
    FormsModule,
  ],
  exports: [GameCardComponent, MatIconModule],
})
export class GameModule {}
