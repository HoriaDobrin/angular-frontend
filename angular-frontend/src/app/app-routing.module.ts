import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.guard';
import { TokenResolver } from 'src/resolvers/auth.resolver';

const routes: Routes = [
  // { path: 'test', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [AuthGuardService],
    // resolve: [TokenResolver],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
