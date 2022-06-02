export interface AbilityItem {
  ability: Ability;
  is_hidden: false;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}
