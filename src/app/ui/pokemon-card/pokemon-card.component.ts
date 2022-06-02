import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Pokemon } from './interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input()
  public pokemon!: Pokemon | null;
}
