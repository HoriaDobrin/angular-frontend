import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.homeService.checkAuthentication();
  }

  logOut() {
    localStorage.clear();
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
