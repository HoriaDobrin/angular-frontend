import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';
import { Game } from '../models/game.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient, private router: Router) {}

  async getGameById(id: string): Promise<Game> {
    const game = (await firstValueFrom(
      this.http.get(apiBaseUrl + '/game/' + id)
    )) as Game;

    if (game) {
      return game;
    }
    throw new Error('Game could not be found');
  }

  async getAllGames(): Promise<void> {
    await this.http.get(apiBaseUrl + '/game').subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          console.log(typeof data);
          console.log(data.length);
        }
        console.log(data);
      },
      error: (error) => {
        alert(error);
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

  async deleteGame(cardData: Game): Promise<void> {
    console.log(apiBaseUrl + '/game/' + cardData.id);
    await this.http.delete(apiBaseUrl + '/game/' + cardData.id).subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (error) => {
        alert('Please log in to delete a game');
      },
    });
  }

  async addGame(cardData: Game): Promise<void> {
    await this.http.post(apiBaseUrl + '/game', cardData).subscribe({
      next: (data) => {
        console.log('A mers sefule');
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
        alert('Please log in to add a cart');
      },
    });
    this.router.navigate(['/home']);
  }

  async updateGame(cardData: Game): Promise<void> {
    const gameWithoutId = {
      name: cardData.name,
      genre: cardData.genre,
      price: cardData.price,
    };

    await this.http
      .put(apiBaseUrl + '/game/' + cardData.id, gameWithoutId)
      .subscribe({
        next: (data) => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          alert('Something went wrong..');
        },
      });
  }
}
