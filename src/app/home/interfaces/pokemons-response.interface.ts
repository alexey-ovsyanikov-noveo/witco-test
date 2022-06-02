import { Pokemon } from '@ui/pokemon-card';

export interface PokemonsResponse {
  count: number;
  results: Results[];
}

export interface Results {
  name: string;
  url: string;
}
