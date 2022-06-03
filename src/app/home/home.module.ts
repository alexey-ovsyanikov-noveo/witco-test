import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PokemonCardModule } from '@ui/pokemon-card';
import { LoadMoreModule } from '@ui/load-more/load-more.module';
import { LoaderModule } from '@ui/loader';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoadMoreModule,
    LoaderModule,
    PokemonCardModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class HomeModule {}
