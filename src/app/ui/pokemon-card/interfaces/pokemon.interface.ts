import { AbilityItem } from './ability.interface';

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: AbilityItem[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  favourite: boolean;
}
