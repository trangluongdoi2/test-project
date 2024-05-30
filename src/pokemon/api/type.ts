export type PokemonItem = {
  id: string,
  number: number,
  name: string,
  type_1: number | null,
  type_2: number | null,
  total: number,
  hp: number,
  attack: number,
  defense: number,
  sp_atk: number,
  sp_def: number,
  speed: number,
  generation: number,
  legendary: number,
  created_at: string,
  updated_at: string,
}

export type PokemonMetaItem = {
  currentPage: number,
  lastPage: number,
  itemPerPage: number,
  totalItems: number,
}

export type PokemonDetails = {
  id: string,
  src?: string,
  number: number,
  name: string,
  type_1: number | null,
  type_2: number | null,
  total: number,
  hp: number,
  attack: number,
  defense: number,
  sp_atk: number,
  sp_def: number,
  speed: number,
  generation: number,
  legendary: number,
  created_at: string,
  updated_at: string,
}

export type PokemonClass = 
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Electric'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dark'
  | 'Dragon'
  | 'Steel'
  | 'Fairy'

export type PokemonType = {
  id: number,
  name: PokemonClass
}