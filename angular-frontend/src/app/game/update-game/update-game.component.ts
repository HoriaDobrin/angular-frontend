import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css'],
})
export class UpdateGameComponent implements OnInit {
  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    const tokenRes = this.route.snapshot.data['TokenRes'];

    if (!tokenRes) {
      console.log('Access interzis la componenta');
      this.router.navigate(['/login']);
    } else {
      console.log('Acces permis');
    }

    const gameId = this.route.snapshot.paramMap.get('id');

    if (gameId) {
      this.game = await this.gameService.getGameById(gameId);
      console.log(this.game);
    } else {
      alert('Game id could not be found');
      this.router.navigate(['/home']);
    }
  }

  submitForm() {
    const gameToUpdate: Game = {
      id: this.game.id,
      name: this.game.name,
      genre: this.game.genre,
      price: this.game.price,
    };

    this.gameService.updateGame(gameToUpdate);

    this.router.navigate(['/home']);
  }
}
