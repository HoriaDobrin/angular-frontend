import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent {
  gameForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
    this.gameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submit() { 
    if (this.gameForm.valid) {
      const newGame: Game = this.gameForm.value as Game;
      this.gameService.addGame(newGame);
      // Trimiteți newGame către serviciul dvs. pentru a adăuga jocul în backend.
      console.log('Jocul de adăugat:', newGame);
    }
  }
}
