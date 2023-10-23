import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardClass } from './guards/auth.guard';
import { TokenRes, TokenResolver } from 'src/resolvers/auth.resolver';
import { AddGameComponent } from './game/add-game/add-game.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [AuthGuardClass],
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
