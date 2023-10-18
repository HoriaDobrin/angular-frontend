import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GameModule } from '../game/game.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    GameModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
