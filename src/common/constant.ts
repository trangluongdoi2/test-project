import { PokemonClass } from "@/pokemon/api/type";
import { ListFieldSort } from "@/type";

export const listFields: ListFieldSort[] = [
  {
    field: 'number',
    direction: 'desc',
  },
  {
    field: 'total',
    direction: 'desc',
  },
  {
    field: 'hp',
    direction: 'desc',
  },
  {
    field: 'attack',
    direction: 'desc',
  },
  {
    field: 'defense',
    direction: 'desc',
  },
  {
    field: 'sp_atk',
    direction: 'desc',
  }, {
    field: 'sp_def',
    direction: 'desc',
  },
  {
    field: 'speed',
    direction: 'desc',
  },
];

export const pokemonTypesMap: { [key: number | string]: string } = {
  0: 'Normal',
  1: 'Fire',
  2: 'Water',
  3: 'Grass',
  4: 'Electric',
  5: 'Ice',
  6: 'Fighting',
  7: 'Poison',
  8: 'Ground',
  9: 'Flying',
  10: 'Psychic',
  11: 'Bug',
  12: 'Rock',
  13: 'Ghost',
  14: 'Dark',
  15: 'Dragon',
  16: 'Steel',
  17: 'Fairy',
};

export const pokemonFilterParamsMap: { [key: number | string ]: string} = {
  name: 'Name',
 'min_total': 'Min Total',
 'max_total': 'Max Total',
 'min_speed': 'Min Speed',
 'max_speed': 'Max Speed',
 'min_sp_def': 'Min Special Defense',
 'max_sp_def': 'Max Special Defense',
 'max_sp_atk': 'Max Special Attack',
 'min_sp_atk': 'Min Special Attack',
 'max_hp': 'Max HP',
 'min_hp': 'Min HP',
 'max_defense': 'Max Defense',
 'min_defense': 'Min Defense',
 'max_attack': 'Max Attack',
 'min_attack': 'Min Attack',
}

export const defaultConfigs = {
  pageNumber: 30,
  pageSize: 30,
}