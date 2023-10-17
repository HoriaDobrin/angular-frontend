import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiBaseUrl } from 'config';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getAllGames() {
    this.http.get(apiBaseUrl + '/game').subscribe({
      next: (data) => {
        if(Array.isArray(data)){
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

  getFirstFiveGames() {
    this.http.get(apiBaseUrl + '/game').subscribe({
      next: (data)  => {
        if(Array.isArray(data)){
          for (let index = 0; index < 5; index++) {
            console.log(index);
            console.log(data[index]);
          }
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
