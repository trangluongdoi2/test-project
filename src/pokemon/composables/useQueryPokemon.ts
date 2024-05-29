import { useQuery } from "@tanstack/vue-query";
import PokemonApi from '../api';
import { Ref, toRef } from "vue";

const pokemonApi = new PokemonApi();
class PokemonQuery {
  useQueryPokemonItems = (queryFilter: Ref<string> = toRef(''), querySort: Ref<string> =  toRef('')) => {
    return useQuery({
      queryKey: ['pokemons'],
      queryFn: () => pokemonApi.getPokemonItems(queryFilter.value, querySort.value),
      enabled: false,
    });
  }

  useQueryPokemonItemsTest = (queryConfigs: any) => {
    return useQuery({
      queryKey: ['pokemons'],
      queryFn: () => pokemonApi.getPokemonItemsTest(queryConfigs),
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