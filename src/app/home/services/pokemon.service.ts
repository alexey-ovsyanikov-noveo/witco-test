import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly _http: HttpClient) {}

  public list(limit = 10, offset = 0): Observable<any> {
    return this._http.get('pokemon/ditto');
  }
}
