import { Pokemon } from '@ui/pokemon-card';

export interface PokemonsResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}
