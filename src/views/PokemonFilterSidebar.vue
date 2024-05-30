<template>
  <div class="side-bar">
    <PokemonFilters class="filter-container" @change-filters="$emit('update-filters', $event)"/>
    <div class="filter-search-container">
      <PokemonFilterBySearch 
        v-for="field in Object.keys(pokemonFilterParamsMap)" 
        :key="field"
        :field="field"
        :label="pokemonFilterParamsMap[field]"
        @change-filters="$emit('update-filters-by-search', { field, data: $event })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { pokemonFilterParamsMap } from '@/common/constant';
import PokemonFilterBySearch from '@/pokemon/components/PokemonFilterBySearch.vue';
import PokemonFilters from '@/pokemon/components/PokemonFilters.vue';

export default {
  components: {
    PokemonFilters,
    PokemonFilterBySearch,
  },
  emits: ['update-filters', 'update-filters-by-search'],
  setup() {
    return {
      pokemonFilterParamsMap,
    }
  },
}
</script>

<style lang="scss" scoped>
.side-bar {
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  // box-shadow: 0px 0px 5px 0px #c4c4c4;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  flex-direction: column;
  overflow-y: auto;
  .filter-search-container {
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-direction: column;
    overflow-y: auto;
  }
}
</style>