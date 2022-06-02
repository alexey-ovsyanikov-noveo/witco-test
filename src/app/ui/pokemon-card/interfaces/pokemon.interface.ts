import { AbilityItem } from './ability.interface';

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  favourite: boolean;
  abilities: AbilityItem[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
