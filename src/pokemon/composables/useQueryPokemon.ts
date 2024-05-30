import { useQuery } from "@tanstack/vue-query";
import pokemonApi from '../api';
import { Ref } from "vue";
class PokemonQuery {
  useQueryPokemonItems = (queryConfigs: any) => {
    return useQuery({
      queryKey: ['pokemons'],
      queryFn: () => pokemonApi.getPokemonItems(queryConfigs),
      enabled: false,
    });
  }

  useQueryPokemonTypes = () => {
    return useQuery({
      queryKey: ['pokemons-types'],
      queryFn: () => pokemonApi.getPokemonByType(),
      enabled: false,
    });
  }

  useQueryPokemonDetails = (id: Ref<string>) => {
    return useQuery({
      queryKey: ['pokemon-details'],
      queryFn: () => pokemonApi.getPokemonDetails(id.value),
      enabled: false,
    });
  }

  useQueryPokemonDownloadSprite = (id: Ref<string>) => {
    return useQuery({
      queryKey: ['pokemon-download-sprite'],
      queryFn: () => pokemonApi.getPokemonDownloadSprite(id.value),
      enabled: false,
    });
  }
}

export const pokemonQuery = new PokemonQuery();