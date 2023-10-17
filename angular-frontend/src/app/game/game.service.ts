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

  // getFirstFiveGames(): Game[] {
  //   let newArr: Game[];
  //   this.http.get(apiBaseUrl + '/game').subscribe({
  //     next: (data) => {
  //       if (Array.isArray(data)) {
  //         for (let index = 0; index < 5; index++) {
  //           console.log(index);
  //           console.log(data[index]);
  //           newArr.push(data[index]);
  //           return newArr;
  //         }
  //       } else {
  //         throw new Error('Data not good bruv');
  //       }
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       throw new Error('La misto am pus asta');
  //     },
  //   });
  // }

  async getFirstFiveGames(): Promise<Game[]> {
    try {
      const data = await firstValueFrom(this.http.get(apiBaseUrl + '/game'));
      // console.log(data);
      // console.log(Array.isArray(data));
      // console.log(typeof data);

      if (Array.isArray(data)) {
        return data.slice(0, 5) as Game[];
      } else {
        return [];
      }

      // const data = await this.http.get(apiBaseUrl + '/game').toPromise();

      // if (Array.isArray(data)) {
      //   return data.slice(0, 5) as Game[];
      // } else {
      //   return [];
      // }
    } catch (error) {
      console.error(error);
      throw new Error('A apărut o eroare.');
    }
  }

  async deleteGame(cardData: Game) {
    console.log(apiBaseUrl + '/game/' + cardData.id);
    this.http.delete(apiBaseUrl + '/game/' + cardData.id);
  }
}
