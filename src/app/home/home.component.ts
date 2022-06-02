import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, finalize, forkJoin, Observable, pluck, switchMap, take, tap } from 'rxjs';

import { LoaderService } from '@ui/loader';
import { Pokemon } from '@ui/pokemon-card';

import { PokemonService } from './services/pokemon.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _offset = 0;
  private _limit = 50;

  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable();
  }

  public get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _pokemonService: PokemonService,
  ) {}

  public ngOnInit(): void {
    this._loadPokemons();
  }

  public loadMore(): void {
    this._offset += this._limit;

    this._loadPokemons();
  }

  private _loadPokemons(): void {
    this._loaderService.enable();

    this._pokemonService
      .list(this._limit, this._offset)
      .pipe(
        take(1),
        switchMap((response) => {
          this._total$.next(response.count);

          const details = response.results.map((pokemon) => {
            const match = pokemon.url.match(/\/\d+\//);
            const startIndex = match?.index ?? 0;
            const id = pokemon.url.substring(startIndex + 1).replace('/', '');

            return this._pokemonService.get(id);
          });

          return forkJoin(details);
        }),
        tap((pokemons) => {
          const newPokemonsList = [...this._pokemons$.value, ...pokemons];

          this._pokemons$.next(newPokemonsList);
        }),
        finalize(() => {
          this._loaderService.disable();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
