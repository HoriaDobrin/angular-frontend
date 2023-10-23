import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {
  
  gameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.gameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    const tokenRes = this.route.snapshot.data['TokenRes'];

    if (!tokenRes) {
      console.log('Access interzis la componenta');
      this.router.navigate(['/login']);
    } else {
      console.log('Acces permis');
    }
  }

  submit() {
    if (this.gameForm.valid) {
      const newGame: Game = this.gameForm.value as Game;
      this.gameService.addGame(newGame);
    }
  }
}
