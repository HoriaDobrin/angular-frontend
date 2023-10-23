import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  constructor(private gameService: GameService, private router: Router) {}
  @Input() cardDataArray: Game[] = [];

  deleteGame(cardData: Game) {
    this.gameService.deleteGame(cardData);
  }

  updateGame(cardDataId: string) {
    console.log(cardDataId);

    this.router.navigate(['games/update-game', cardDataId]);
  }
}
