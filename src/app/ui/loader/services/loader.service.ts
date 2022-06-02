import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _enabled$ = new BehaviorSubject<boolean>(false);

  public get enabled$(): Observable<boolean> {
    return this._enabled$.asObservable();
  }

  public enable(): void {
    this._enabled$.next(true);
  }

  public disable(): void {
    this._enabled$.next(false);
  }
}
