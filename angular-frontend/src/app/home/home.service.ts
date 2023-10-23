import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { Game } from '../models/game.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  async getAllGames(): Promise<Game[]> {
    const games = (await firstValueFrom(
      this.http.get(apiBaseUrl + '/game')
    )) as Game[];
    return games;
  }

  async getFirstFiveGames(): Promise<Game[]> {
    try {
      const data = await firstValueFrom(this.http.get(apiBaseUrl + '/game'));

      if (Array.isArray(data)) {
        return data.slice(0, 5) as Game[];
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error('A apărut o eroare.');
    }
  }

  async exportCSV() {
    await this.http.get(apiBaseUrl + '/game/export').subscribe({
      next: (data) => {
        console.log('A mers exportul varule');
      },
      error: (error) => {
        alert('You are unathorized boss');
      },
    });
  }

  async exportFilteredCSV(currentGames: Game[]) {
    await this.http
      .post(apiBaseUrl + '/game/export-filtered', currentGames)
      .subscribe({
        next: (data) => {
          console.log('A mers exportul filtrat varule');
        },
        error: (error) => {
          alert('You are unathorized boss');
        },
      });
  }

  checkAuthentication() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
