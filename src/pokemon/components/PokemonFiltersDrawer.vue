<template>
  <AppDrawer :direction="'fade-up'" v-model:visible="visibleVal" >
    <template v-slot:content>
      <div class="content-container">
        <PokemonFilters class="filter-container" @change-filters="updateFilters"/>
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
    <template v-slot:footer>
      <app-button @click="onSubmitFilters">Filter</app-button>
    </template>
  </AppDrawer>
</template>

<script lang="ts">
import AppDrawer from '@/components/AppDrawer.vue';
import { Props } from '@/components/AppModal.vue';
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext, ref, watch } from 'vue';
import { pokemonFilterParamsMap } from '@/common/constant';
import PokemonFilterBySearch from '@/pokemon/components/PokemonFilterBySearch.vue';
import PokemonFilters from '@/pokemon/components/PokemonFilters.vue';
import AppButton from '@/components/AppButton.vue';

export default {
  emits: ['update-filters', 'update:visible'],
  components: {
    AppDrawer,
    AppButton,
    PokemonFilters,
    PokemonFilterBySearch,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'visible');
    const currentQueryFilters = ref<string>('');
    const currentQueryFiltersBySearch = ref<string>('');
    const filterBySearchMap = ref<Map<string, string>>(new Map());
    const entireQueryFilters = ref<string>('');

    const onSubmitFilters = () => {
      visibleVal.value = false;
      emit('update-filters', entireQueryFilters.value);
    }

    const updateFilters = (data: any) => {
      const dataArr: string[] = [];
      for (const [key, value] of data.entries()) {
        dataArr.push(`filter[${key}]=${value}`);
      }
      currentQueryFilters.value = dataArr.join('&');
    }

    const updateFiltersBySearch = (input: { field: string, data: { enabled: boolean, value: string }}) => {
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

    watch([currentQueryFilters, currentQueryFiltersBySearch], ([new1, new2]: [string, string]) => {
      entireQueryFilters.value = (new1 ? new1 + '&' : '') + new2;
      // onSubmitFilters();
    });


    return {
      visibleVal,
      pokemonFilterParamsMap,

      onSubmitFilters,
      updateFilters,
      updateFiltersBySearch,
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.pokemon-filters) {
    gap: 4px;
    padding: 0;
    justify-content: unset;
    min-height: unset;
  }
  .filter-search-container {
    flex: 1 1 0;
    margin-top: 8px;
    overflow: auto;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>