import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private homeService: HomeService, private router: Router) {}

  clicked() {
    this.homeService.getAllGames();
  }

  clickBoss() {
    this.homeService.getFirstFiveGames();
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  addGame() {
    this.router.navigate(['/add-game']);
  }

  exportCSV() {
    this.homeService.exportCSV();
  }
}
