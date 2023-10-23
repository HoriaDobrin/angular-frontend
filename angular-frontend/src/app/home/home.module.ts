import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GameModule } from '../game/game.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    GameModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    NavBarComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
