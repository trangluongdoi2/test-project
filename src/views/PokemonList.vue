<template>
  <div class="container" :class="{'container-mobile': isHideFilterSidebar}">
    <PokemonFilterSidebar
      v-if="!isHideFilterSidebar"
      @update-filters="updateFilters($event as any)"
      @update-filters-by-search="updateFiltersBySearch($event as any)"
    />
    <div class="pokemon-list__container">
      <div>
        <h1 class="title">Pokemon Items Table</h1>
      </div>
      <app-button class="filter-button" v-if="isMobileDevice()" @click="showPokemonFilterDrawer">
        Filter <span><app-icon name="filter" /></span>
      </app-button>
      <div class="pokemon-config">
        <AppSearch
          v-model="configQuery.pageSize" 
          placeholder="Enter Page Size"
          type="number"
          label="Enter Page Size"
          :hiddenIcon="true"
          :defaultValue="30"

          @search="handlePageSize($event as number)"
        />
      </div>
      <AppLoading class="loading" v-if="isFetching" />
      <div class="pokemon-list" v-if="pokemonItems?.length">
        <PokemonItemsTable
          v-if="pokemonItems?.length" 
          :items="pokemonItems"
          :sortField="sortField"

          @select-item="onShowDetail($event as any)"
          @sort-item="handleSort($event as any)"
        />
        <AppPagination
          :totalPages="metaConfigs?.lastPage"
          :itemsPerPage="metaConfigs?.itemPerPage"
          @select-page="selectPageNumber($event as number)"/>
      </div>
      <div v-else-if="!isFetching && !pokemonItems?.length">No Pokemon</div>
    </div>
  </div>
  <PokemonDownloadSpriteModal
    v-if="pokemonDetailsVal"
    v-model:visible="isShowPokemonDetailsModal"
    :isLoading="isFetchingPokemonDetails"
    :item="pokemonDetailsVal"
    :width="isMobileDevice() ? '100%' : '50%'"

    @download-sprite="onDownloadSprite($event as string)"
  />
</template>

<script lang="ts">
import { pokemonFilterParamsMap } from '@/common/constant';
import AppLoading from '@/components/AppLoading.vue';
import AppModal from '@/components/AppModal.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppSort from '@/components/AppSort.vue';
import AppSearch from '@/components/AppSearch.vue';
import { SortField } from '@/components/AppTable.vue';
import { PokemonDetails, PokemonItem, PokemonMetaItem } from '@/pokemon/api/type';
import PokemonCard from '@/pokemon/components/PokemonCard.vue';
import PokemonDownloadSpriteModal from '@/pokemon/components/PokemonDownloadSpriteModal.vue';
import PokemonFilterBySearch from '@/pokemon/components/PokemonFilterBySearch.vue';
import PokemonFilters from '@/pokemon/components/PokemonFilters.vue';
import PokemonItemsTable from '@/pokemon/components/PokemonItemsTable.vue';
import { pokemonQuery } from '@/pokemon/composables/useQueryPokemon';
import { QueryConfigs } from '@/type';
import PokemonFilterSidebar from '@/views/PokemonFilterSidebar.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import AppCheckbox from '@/components/AppCheckbox.vue';
import pokemonApi from '@/pokemon/api';
import { isMobileDevice } from '@/common/device';

export default {
  components: {
    AppLoading,
    AppModal,
    AppPagination,
    AppSort,
    AppSearch,
    AppCheckbox,
    PokemonCard,
    PokemonFilters,
    PokemonDownloadSpriteModal,
    PokemonFilterBySearch,
    PokemonItemsTable,
    PokemonFilterSidebar,
  },
  setup() {
    const {
      useQueryPokemonItems,
      useQueryPokemonDetails,
      useQueryPokemonDownloadSprite,
      useQueryPokemonTypes,
    } = pokemonQuery;
    const sortInfos = ref<string>();
    const idPokemon = ref<string>('');
    const isShowPokemonDetailsModal = ref<boolean>(false);
    const isShowPokemonFilterDrawer = ref<boolean>(false);
    const pokemonDetails = ref<PokemonDetails>();
    const currentQueryFilters = ref<string>('');
    const currentQueryFiltersBySearch = ref<string>('');
    const currentQuerySorts = ref<string>('');
    const entireQueryFilters = ref<string>('');
    const configQuery = ref<QueryConfigs>({
      pageNumber: 1,
      pageSize: 30,
      queryFilters: '',
      querySort: '',
    });
    const sortField = ref<SortField>({
      field: 'number',
      orderSort: 'desc',
    });
    const filterBySearchMap = ref<Map<string, string>>(new Map());
    const totalPages = ref<number>(1);
    const metaConfigs = ref<PokemonMetaItem>();

    // const isHideFilterSidebar = computed(() => isMobileDevice());

    const isHideFilterSidebar = ref<boolean>(false);

    const {
      data: pokemonItems,
      isFetching,
      refetch,
    } = useQueryPokemonItems(configQuery);

    const {
      data: pokemonDetailsVal,
      isFetching: isFetchingPokemonDetails,
      refetch: refetchPokemonDetails
    }  = useQueryPokemonDetails(idPokemon);

    const { refetch: refetchPokemonDownloadSprite }  = useQueryPokemonDownloadSprite(idPokemon);
    const { refetch: refetchPokemonTypes } = useQueryPokemonTypes();

    const showPokemonDownloadSpriteModal = () => {
      isShowPokemonDetailsModal.value = true;
    }

    const showPokemonFilterDrawer = () => {
      isShowPokemonFilterDrawer.value;
    }

    const handleSort = (data: SortField) => {
      sortInfos.value = data.orderSort === 'desc' ? data.field : `-${data.field}`;
      currentQuerySorts.value = `sort=${sortInfos.value}`;
      sortField.value = data;
      configQuery.value.querySort = currentQuerySorts.value;
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

    const handlePageSize = (data: number) => {
      if (data && data > 0) {
        configQuery.value.pageSize = Number(data);
      }
    }

    const selectPageNumber = (data: number) => {
      configQuery.value.pageNumber = data;
    }

    const getMetaConfigs = async (): Promise<PokemonMetaItem> => {
      const data = await pokemonApi.getPokemonMeta();
      metaConfigs.value = {...data };
      return data as PokemonMetaItem;
    }

    const checkHiddenSidebar = () => {
      isHideFilterSidebar.value = window.innerWidth <= 768;
    }

    onMounted(() => {
      refetch();
      refetchPokemonTypes();
      getMetaConfigs().then(({ itemPerPage }) => {
        configQuery.value.pageSize = itemPerPage;
      });

      window.addEventListener('resize', checkHiddenSidebar);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkHiddenSidebar);
    })

    watch([currentQueryFilters, currentQueryFiltersBySearch], ([new1, new2]: [string, string]) => {
      entireQueryFilters.value = (new1 ? new1 + '&' : '') + new2;
      configQuery.value.queryFilters = entireQueryFilters.value;
    });

    watch(configQuery, async () => {
      await refetch();
      await getMetaConfigs();
    }, { deep: true });

    return {
      isFetching,
      pokemonItems,
      pokemonDetails,
      isShowPokemonDetailsModal,
      handleSort,
      isFetchingPokemonDetails,
      pokemonDetailsVal,
      sortField,
      configQuery,
      totalPages,
      metaConfigs,

      showPokemonDownloadSpriteModal,
      onShowDetail,
      onDownloadSprite,
      updateFilters,
      updateFiltersBySearch,
      pokemonFilterParamsMap,
      handlePageSize,
      selectPageNumber,
      isMobileDevice,
      isHideFilterSidebar,
      showPokemonFilterDrawer,
    }
  },
}
</script>

<style lang="scss" scoped>
$side-bar-width: 300px;
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #f7f8f8;
  &-mobile {
    flex-direction: column;
  }
}
.title {
  margin: 10px;
}
.pokemon-list__container {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f8f8;
  padding: 10px;
  position: relative;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(gray, 0.8);
    z-index: 99;
  }
  .pokemon-config {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    height: 60px;
    padding: 20px;
    > .search-wrapper {
      flex: 1;
      height: inherit;
    }
  }
  .pokemon-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .filter-button {
    color: black;
  }
}
</style>