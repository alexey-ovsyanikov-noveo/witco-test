import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject,
  catchError,
  finalize,
  forkJoin,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { LoaderService } from '@ui/loader';
import { Pokemon } from '@ui/pokemon-card';

import { PokemonService } from './services/pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlService } from './services/url.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UrlService],
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

  public get enagled$(): Observable<boolean> {
    return this._loaderService.enabled$;
  }

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _loaderService: LoaderService,
    private readonly _pokemonService: PokemonService,
    private readonly _urlService: UrlService,
  ) {}

  public ngOnInit(): void {
    this._loadPokemons();
  }

  public pockemonTrackBy(index: number, pokemon: Pokemon): number {
    return pokemon.id;
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
            const id = this._urlService.extractID(pokemon.url);

            return this._pokemonService.get(id);
          });

          return forkJoin(details);
        }),
        tap((pokemons) => {
          const newPokemonsList = [...this._pokemons$.value, ...pokemons];
          this._pokemons$.next(newPokemonsList);
        }),
        catchError((err) => {
          this._snackBar.open('Loading error was detected!', 'Hide', {
            duration: 4000,
          });
          this._offset -= this._limit;

          return of(err);
        }),
        finalize(() => {
          this._loaderService.disable();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
