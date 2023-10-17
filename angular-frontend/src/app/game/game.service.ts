import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { Game } from '../models/game.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getAllGames() {
    this.http.get(apiBaseUrl + '/game').subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          console.log(typeof data);
          console.log(data.length);
        }
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  async deleteGame(cardData: Game) {
    console.log(apiBaseUrl + '/game/' + cardData.id);
    this.http.delete(apiBaseUrl + '/game/' + cardData.id).subscribe({
      next: (data) => {
        // console.log('Data' + data);
        window.location.reload();
      },
      error: (error) => {
        alert('Please log in to delete a game');
      },
    });
  }

  // async addGame(cardData: Game) {
  //   this.http.post(apiBaseUrl + '/game', cardData).subscribe({
  //     next: (data) => {
  //       console.log('A mers sefule');
  //     },
  //     error: (error) => {
  //       alert('Please log in to add a cart');
  //     },
  //   });
  // }
}
