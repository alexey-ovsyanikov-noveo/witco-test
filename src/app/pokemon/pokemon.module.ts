import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LoaderModule } from '@ui/loader';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [PokemonComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    LoaderModule,
    MatIconModule,
    MatButtonModule,
    NgxChartsModule,
  ],
})
export class PokemonModule {}
