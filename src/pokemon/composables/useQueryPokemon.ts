import { useQuery } from "@tanstack/vue-query";
import PokemonApi from '../api';

const pokemonApi = new PokemonApi();

class PokemonQuery {
  useQueryPokemonItem = () => {
    return useQuery({
      queryKey: ['pokemons'],
      queryFn: () => pokemonApi.getPokemonItems(),
      enabled: false,
    });
  }

  useQueryPokemonDetails = (id: string) => {
    return useQuery({
      queryKey: ['pokemon-details'],
      queryFn: () => pokemonApi.getPokemonDetails(id),
      enabled: false,
    });
  }
}

export const pokemonQuery = new PokemonQuery();