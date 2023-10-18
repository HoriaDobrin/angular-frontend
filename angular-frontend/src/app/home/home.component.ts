import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isAuthenticated: boolean = false;

  minPrice: number = 0;
  maxPrice: number = 0;
  filteredGenres: string[] = [];

  searchForm: FormGroup;

  // searchForm : FormGroup;

  selectedGenre: string = '';
  allGames: Game[] = [];
  firstFiveGames: Game[] = [];

  filteredGames: Game[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.checkAuthentication();
    this.loadFormConfig();

    this.searchForm = this.formBuilder.group({
      sliderValue: new FormControl([this.minPrice, this.maxPrice]),
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  // async reloadGames(newGameArray: Game[]) {
  //   if (newGameArray) {
  //     this.firstFiveGames = newGameArray;
  //   } else {
  //     alert('New array is empty');
  //   }
  // }

  async loadFormConfig() {
    this.allGames = await this.homeService.getAllGames();
    console.log(this.allGames);

    this.firstFiveGames = await this.homeService.getFirstFiveGames();
    console.log(this.firstFiveGames);

    this.setMinMaxSlider(this.allGames);
    this.filteredGenres = this.getUniqueGenres(this.allGames); // aici se initializeaza pentru dropdown
  }

  getUniqueGenres(gamesArray: Game[]): string[] {
    const uniqueSet = new Set(gamesArray.map((game) => game.genre));

    const uniqueGenres = Array.from(uniqueSet);

    return uniqueGenres;
  }

  setMinMaxSlider(gamesArray: Game[]) {
    for (let index = 0; index < gamesArray.length; index++) {
      if (gamesArray[index].price > this.maxPrice) {
        this.maxPrice = gamesArray[index].price;
      }
      if (gamesArray[index].price < this.minPrice) {
        this.minPrice = gamesArray[index].price;
      }
    }
  }

  checkAuthentication() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  filterByGenre(genre: string) {
    console.log(genre);
    console.log(this.selectedGenre);
    if (genre && this.allGames) {
      const filteredByGenre = this.allGames.filter(
        (game) => game.genre === genre
      );

      if (filteredByGenre.length > 5) {
        this.filteredGames = filteredByGenre.splice(0, 5);
      } else {
        this.filteredGames = filteredByGenre;
      }
    }
    this.firstFiveGames = this.filteredGames;
  }

  filterResults(text: string) {
    if (text) {
      console.log(text, this.filteredGames, this.selectedGenre);

      let filteredGenre: Game[] = [];

      if (this.selectedGenre) {
        filteredGenre = this.filteredGames;
        filteredGenre = this.filteredGames.filter((game) =>
          game.name.toLowerCase().includes(text.toLowerCase())
        );
      } else {
        filteredGenre = this.allGames.filter((game) =>
          game.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      console.log('AFTER FILTERING: ');

      console.log(this.filteredGames);

      this.firstFiveGames = filteredGenre;
    } else if (this.selectedGenre) {
      this.filterByGenre(this.selectedGenre);
    } else {
      alert('Wtfffffffff');
      // window.location.reload();
    }
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  // ascendPrice(a: Game, b: Game) {
  //   return a.price - b.price;
  // }
  // descendPrice(a: Game, b: Game) {
  //   return b.price - a.price;
  // }

  ascendingSort() {
    this.firstFiveGames.sort((a: Game, b: Game) => a.price - b.price);
  }

  descendingSort() {
    this.firstFiveGames.sort((a: Game, b: Game) => b.price - a.price);
  }

  onSliderChange() {
    const slider = this.searchForm.value.sliderValue;
    console.log(slider);
    const startValue = slider[0];
    const endValue = slider[1];

    console.log(startValue);
    console.log(endValue);
  }

  // clicked() {
  //   this.homeService.getAllGames();
  // }

  // clickBoss() {
  //   this.homeService.getFirstFiveGames();
  // }

  logIn() {
    this.router.navigate(['/login']);
  }

  addGame() {
    this.router.navigate(['games/add-game']);
  }

  exportCSV() {
    this.homeService.exportCSV();
  }

  goToGames() {
    this.router.navigate(['/games']);
  }
}
