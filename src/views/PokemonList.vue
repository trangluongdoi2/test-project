<template>
  <div class="container">
    <PokemonFilterSidebar 
      @update-filters="updateFilters($event as any)"
      @update-filters-by-search="updateFiltersBySearch($event as any)"
    />
    <div class="pokemon-list__container">
    <AppLoading class="loading" v-if="isFetching" />
    <div class="pokemon-list" v-if="pokemonItems?.length">
      <PokemonItemsTable
        v-if="pokemonItems?.length" 
        :items="pokemonItems"
        :sortField="sortField"

        @select-item="onShowDetail($event as any)"
        @sort-item="handleSort($event as any)"
      />
    </div>
    <div v-else-if="!isFetching && !pokemonItems?.length">No Pokemon</div>
    </div>
  </div>
  <PokemonDownloadSpriteModal
    v-if="pokemonDetailsVal"
    v-model:visible="isShowPokemonDetailsModal"
    :isLoading="isFetchingPokemonDetails"
    :width="'50%'"
    :item="pokemonDetailsVal"

    @download-sprite="onDownloadSprite($event as string)"
  />
</template>

<script lang="ts">
import { pokemonFilterParamsMap } from '@/common/constant';
import AppLoading from '@/components/AppLoading.vue';
import AppModal from '@/components/AppModal.vue';
import AppSort from '@/components/AppSort.vue';
import { SortField } from '@/components/AppTable.vue';
import { PokemonDetails, PokemonItem } from '@/pokemon/api/type';
import PokemonCard from '@/pokemon/components/PokemonCard.vue';
import PokemonDownloadSpriteModal from '@/pokemon/components/PokemonDownloadSpriteModal.vue';
import PokemonFilterBySearch from '@/pokemon/components/PokemonFilterBySearch.vue';
import PokemonFilters from '@/pokemon/components/PokemonFilters.vue';
import PokemonItemsTable from '@/pokemon/components/PokemonItemsTable.vue';
import { pokemonQuery } from '@/pokemon/composables/useQueryPokemon';
import { onMounted, ref, watch } from 'vue';
import PokemonFilterSidebar from '@/views/PokemonFilterSidebar.vue';

export type QueryConfigs = {
  pageNumber: number | undefined,
  pageSize: number | undefined,
  queryFilters: string,
  querySort: string,
}

export default {
  components: {
    AppLoading,
    AppModal,
    PokemonCard,
    PokemonFilters,
    AppSort,
    PokemonDownloadSpriteModal,
    PokemonFilterBySearch,
    PokemonItemsTable,
    PokemonFilterSidebar,
  },
  setup() {
    const {
      useQueryPokemonItems,
      useQueryPokemonItemsTest,
      useQueryPokemonDetails,
      useQueryPokemonDownloadSprite,
      useQueryPokemonTypes,
    } = pokemonQuery;
    const sortInfos = ref<string>();
    const idPokemon = ref<string>('');
    const isShowPokemonDetailsModal = ref<boolean>(false);
    const pokemonDetails = ref<PokemonDetails>();
    const currentQueryFilters = ref<string>('');
    const currentQueryFiltersBySearch = ref<string>('');
    const currentQuerySorts = ref<string>('');
    const entireQueryFilters = ref<string>('');
    const configQuery = ref<QueryConfigs>({
      pageNumber: undefined,
      pageSize: undefined,
      queryFilters: '',
      querySort: '',
    });
    const sortField = ref<SortField>({
      field: 'number',
      orderSort: 'desc',
    });

    const filterBySearchMap = ref<Map<string, string>>(new Map());
    
    const {
      data: pokemonItems,
      isFetching,
      refetch
    } = useQueryPokemonItems(entireQueryFilters, currentQuerySorts);

    const {
      data: data1,
      refetch: refetch1,
    } = useQueryPokemonItemsTest(configQuery);

    const {
      data: pokemonDetailsVal,
      isFetching: isFetchingPokemonDetails,
      refetch: refetchPokemonDetails
    }  = useQueryPokemonDetails(idPokemon);

    const {
      data: pokemonDownloadSprite,
      isFetching: isFetchingPokemonDownloadSprite,
      refetch: refetchPokemonDownloadSprite
    }  = useQueryPokemonDownloadSprite(idPokemon);

    const {
      data: pokemonTypes,
      isFetching: isFetchingPokemonTypes,
      refetch: refetchPokemonTypes,
    } = useQueryPokemonTypes();

    const showPokemonDownloadSpriteModal = () => {
      isShowPokemonDetailsModal.value = true;
    }

    const handleSort = (data: SortField) => {
      sortInfos.value = data.orderSort === 'desc' ? data.field : `-${data.field}`;
      currentQuerySorts.value = `sort=${sortInfos.value}`;
      sortField.value = data;
    }

    const onShowDetail = (data: PokemonItem) => {
      isShowPokemonDetailsModal.value = true;
      idPokemon.value = data.id;
      refetchPokemonDetails();
    }

    const onDownloadSprite = (id: string) => {
      idPokemon.value = id;
      refetchPokemonDownloadSprite();
      const aEl = document.createElement('a');
      const URL_DOWNLOAD = `https://api.vandvietnam.com/api/pokemon-api/pokemons/${idPokemon.value}/sprite`;
      aEl.id = `${idPokemon.value}-download`;
      aEl.href = URL_DOWNLOAD;
      document.body.appendChild(aEl);
      aEl.click();
      aEl.remove();
    }

    const updateFilters = (data: Map<string, string | number>) => {
      const dataArr: string[] = [];
      for (const [key, value] of data.entries()) {
        dataArr.push(`filter[${key}]=${value}`);
      }
      currentQueryFilters.value = dataArr.join('&');
    }

    const updateFiltersBySearch = (input: { field: string, data: { enabled: boolean, value: string } }) => {
      const { field, data } = input;
      if (data.enabled && data.value) {
        filterBySearchMap.value.set(field, data.value);
      } else {
        filterBySearchMap.value.delete(field);
      }
      const dataArr: string[] = [];
      for (const [key, value] of filterBySearchMap.value.entries()) {
        dataArr.push(`filter[${key}]=${value}`);
      };
      currentQueryFiltersBySearch.value = dataArr.join('&');
    }

    onMounted(() => {
      // getDefaultConfigs();
      refetch();
      refetchPokemonTypes();
    });


    watch([currentQueryFilters, currentQueryFiltersBySearch], ([new1, new2]: [string, string]) => {
      entireQueryFilters.value = (new1 ? new1 + '&' : '') + new2;
    });

    watch([currentQuerySorts, entireQueryFilters], ([newSorts, newFilters]: [string, string]) => {
      refetch();
    });

    return {
      isFetching,
      pokemonItems,
      pokemonDetails,
      isShowPokemonDetailsModal,
      handleSort,
      // listFields,
      isFetchingPokemonDetails,
      pokemonDetailsVal,
      sortField,

      showPokemonDownloadSpriteModal,
      onShowDetail,
      onDownloadSprite,
      updateFilters,
      updateFiltersBySearch,
      pokemonFilterParamsMap,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.pokemon-list__container {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .pokemon-list {
    background-color: $dark-base-color;
    height: 100%;
    padding: 20px;
    .loading {
      width: 100%;
      height: 100%;
    }
  }
}
</style>