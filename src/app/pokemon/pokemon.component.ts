import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';

import { LoaderService } from '@ui/loader';
import { Pokemon } from '@ui/pokemon-card';

import { PokemonService } from '../home';
import { PokemonChartStats } from './interfaces/pokemon-chart-stats.interface';

@UntilDestroy()
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent implements OnInit {
  private _pokemon$ = new BehaviorSubject<Pokemon | null>(null);

  public get pokemon$(): Observable<Pokemon | null> {
    return this._pokemon$.asObservable();
  }

  public get enagled$(): Observable<boolean> {
    return this._loaderService.enabled$;
  }

  public view: [number, number] = [700, 400];
  public stats: PokemonChartStats[] = [];

  // chart options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public xAxisLabel = 'Names';
  public yAxisLabel = 'Base stat';

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _pokemonService: PokemonService,
    private readonly _loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    // MSG: we can add resolver instead of component loading data via function
    this._loadPokemon();
  }

  private _loadPokemon(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this._loaderService.enable();
          return this._pokemonService.get(id);
        }),
        tap((pokemon) => {
          this._pokemon$.next(pokemon);

          this.stats = pokemon.stats.map((stat) => {
            return {
              value: stat.base_stat,
              name: stat.stat.name,
            };
          });
          this._loaderService.disable();
        }),
        catchError((err) => {
          this._snackBar.open('Loading error was detected!', 'Hide', {
            duration: 4000,
          });
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
