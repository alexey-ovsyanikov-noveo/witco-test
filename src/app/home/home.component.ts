import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _pokemons$ = new BehaviorSubject<any[]>([]);

  public get pokemons$(): Observable<any[]> {
    return this._pokemons$.asObservable();
  }

  constructor(private readonly _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this._pokemonService.list().subscribe((response) => {
      console.log(response);
    });
  }
}
