import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoaded: boolean = false;
  minPrice: number = 10000000;
  maxPrice: number = 0;

  searchInput: string = '';
  filteredGenres: string[] = [];
  selectedGenre: string = '';

  searchForm: FormGroup | undefined;

  allGames: Game[] = [];
  currentGames: Game[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // this.loadFormConfig();
  }

  async ngOnInit(): Promise<void> {
    await this.loadFormConfig();

    this.searchForm = this.formBuilder.group({
      startThumb: new FormControl(this.minPrice),
      endThumb: new FormControl<number>(this.maxPrice),
    });

    this.isLoaded = true;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  async loadFormConfig(): Promise<void> {
    this.allGames = await this.homeService.getAllGames();

    this.currentGames = await this.homeService.getFirstFiveGames();

    this.setMinMaxSlider(this.allGames);

    this.filteredGenres = this.getUniqueGenres(this.allGames);
  }

  private getUniqueGenres(gamesArray: Game[]): string[] {
    const uniqueSet = new Set(gamesArray.map((game) => game.genre));

    const uniqueGenres = Array.from(uniqueSet);

    return uniqueGenres;
  }

  private setMinMaxSlider(gamesArray: Game[]) {
    for (let index = 0; index < gamesArray.length; index++) {
      if (gamesArray[index].price > this.maxPrice) {
        this.maxPrice = gamesArray[index].price;
      }
      if (gamesArray[index].price < this.minPrice) {
        this.minPrice = gamesArray[index].price;
      }
    }
  }

  filterByGenre(genre: string) {
    let filteredByGenre: Game[];

    if (this.searchInput.length > 0) {
      filteredByGenre = this.allGames.filter((game) =>
        game.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
      filteredByGenre = filteredByGenre.filter((game) => game.genre === genre);
    } else {
      filteredByGenre = this.allGames.filter((game) => game.genre === genre);
    }

    this.currentGames = filteredByGenre;

    return this.currentGames;
  }

  filterResults(text: string) {
    this.searchInput = text;
    let filterResults: Game[] = [];
    if (text) {
      if (this.selectedGenre) {
        filterResults = this.allGames.filter(
          (game) => game.genre === this.selectedGenre
        );
        filterResults = filterResults.filter((game) =>
          game.name.toLowerCase().includes(text.toLowerCase())
        );
      } else {
        filterResults = this.allGames.filter((game) =>
          game.name.toLowerCase().includes(text.toLowerCase())
        );
      }
      this.currentGames = filterResults;
    } else {
      alert('Please insert a search input');
    }
  }

  onSliderChange() {
    const minVal = this.searchForm!.value.startThumb;
    const maxVal = this.searchForm!.value.endThumb;

    let copyGames: Game[] = this.allGames;

    if (this.searchInput.length > 0 && this.selectedGenre) {
      copyGames = this.allGames.filter(
        (game) => game.genre === this.selectedGenre
      );
      copyGames = copyGames.filter((game) =>
        game.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    } else if (this.searchInput.length > 0) {
      copyGames = copyGames.filter((game) =>
        game.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    } else if (this.selectedGenre) {
      copyGames = this.allGames.filter(
        (game) => game.genre === this.selectedGenre
      );
    }

    copyGames = copyGames.filter((game) => {
      return game.price >= minVal && game.price <= maxVal;
    });

    this.currentGames = copyGames;
  }
  ascendingSort() {
    this.currentGames.sort((a: Game, b: Game) => a.price - b.price);
  }

  descendingSort() {
    this.currentGames.sort((a: Game, b: Game) => b.price - a.price);
  }

  logIn() {
    this.router.navigate(['/login']);
  }

  addGame() {
    this.router.navigate(['games/add-game']);
  }

  exportCSV() {
    this.homeService.exportCSV();
  }

  exportFilteredCSV() {
    this.homeService.exportFilteredCSV(this.currentGames);
  }

  resetFilter() {
    this.searchInput = '';
    this.selectedGenre = '';
    this.currentGames = this.allGames;
  }

  onSubmit() {}
}
