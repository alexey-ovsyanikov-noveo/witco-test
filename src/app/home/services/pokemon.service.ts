import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '@ui/pokemon-card';
import { Observable } from 'rxjs';

import { PokemonsResponse } from '../interfaces/pokemons-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly _http: HttpClient) {}

  public list(limit = 50, offset = 0): Observable<PokemonsResponse> {
    const params = new HttpParams()
      .append('limit', limit.toString())
      .append('offset', offset.toString());

    return this._http.get<PokemonsResponse>('pokemon', {
      params,
    });
  }

  public get(id: number): Observable<Pokemon> {
    const url = `pokemon/${id}`;

    return this._http.get<Pokemon>(url);
  }
}
