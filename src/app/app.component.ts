import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from '@ui/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public get enagled$(): Observable<boolean> {
    return this._loaderService.enabled$;
  }

  constructor(private readonly _loaderService: LoaderService) {}
}
