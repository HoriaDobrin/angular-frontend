import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'], 
})
export class GameCardComponent {
  constructor(private gameService: GameService) {
    this.loadFirstFiveGames();
  }
  // cardDataArray : Game[] = this.gameService.getFirstFiveGames();
  cardDataArray: Game[] = []; 

  async loadFirstFiveGames() {
    try {
      this.cardDataArray = await this.gameService.getFirstFiveGames();
    } catch (error) {
      console.error(error);
    }
  }

  deleteCard(cardData: Game) {
    this.gameService.deleteGame(cardData);
  }

  // addCard(cardData: Game){
  //   this.gameService.addGame(cardData);
  // }
}
