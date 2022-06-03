import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
  public extractID(url: string): number {
    const match = url.match(/\/\d+/);
    const startIndex = match?.index ?? 0;
    const stringWithID = url.substring(startIndex + 1).replace('/', '');
    const id = Number(stringWithID);

    return id;
  }
}
