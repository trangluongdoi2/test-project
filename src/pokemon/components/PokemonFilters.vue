<template>
  <div class="pokemon-filters">
    <!-- <app-button class="filters-button" @click="onShowPokemonFilterModal">Filters</app-button> -->
    <div class="filters-title">Filter</div>
    <AppSelect v-model:value="currentSelectedGeneration" @change="onChangeGeneration">
      <option class="option-default" :value="undefined">Select Generation...</option>
      <option
        v-for="option in filterOptionsGenerations"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </AppSelect>
    <AppSelect v-model:value="currentSelectedLegendary" @change="onChangeLegendary">
      <option class="option-default" :value="undefined">Select Legendary...</option>
      <option
        v-for="option in filterOptionsLegendary"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </AppSelect>
    <AppSelect v-model:value="currentSelectedType" @change="onChangeType">
      <option class="option-default" :value="undefined">Select a type...</option>
      <option
        v-for="option in filterOptionsTypes"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </AppSelect>
    <PokemonFiltersModal v-model:visible="isShowPokemonFilterModal"/>
  </div>
</template>

<script lang="ts">
import { pokemonTypesMap } from '@/common/constant';
import AppRadioGroup from '@/components/AppRadioGroup.vue';
import AppSelect from '@/components/AppSelect.vue';
import { SetupContext, ref, watch } from 'vue';
import PokemonFiltersModal from '@/pokemon/components/PokemonFiltersModal.vue';

export default {
  components: {
    AppSelect,
    AppRadioGroup,
    PokemonFiltersModal,
  },
  emits: ['change-filters'],
  setup(_, { emit }: SetupContext) {
    const currentSelectedName = ref<string>('');
    const currentSelectedGeneration = ref<number | undefined>();
    const currentSelectedLegendary = ref<number>();
    const currentSelectedType = ref<number>();
    const currentSelectedMinTotal = ref<number>(180);
    const currentSelectedMaxTotal = ref<number>(700);
    const currentSelectedMinSpeed = ref<number>(100);
    const currentSelectedMaxSpeed = ref<number>(200);
    const currentMinSpecialDefense = ref<number>();
    const currentMaxSpecialDefense = ref<number>();
    const currentMinSpecialAttack = ref<number>();
    const currentMaxSpecialAttack = ref<number>();
    const currentMinHP = ref<number>();
    const currentMaxHP = ref<number>();
    const currentMinAttack = ref<number>();
    const currentMaxAttack = ref<number>();
    const currentMaxDefense = ref<number>();
    const currentMinDefense = ref<number>();
    const isShowPokemonFilterModal = ref<boolean>(false);

    const filterMap = ref<Map<string, any>>(new Map());

    const onShowPokemonFilterModal = () => {
      console.log('onShowPokemonFilterModal...');
      isShowPokemonFilterModal.value = true;
    }

    const onChangeGeneration = (data: any) => {
      if (data) {
        filterMap.value.set('generation', data);
      } else {
        currentSelectedGeneration.value = undefined;
        filterMap.value.delete('generation');
      }
    }

    const onChangeLegendary = (data: any) => {
      if (typeof data === 'number') {
        filterMap.value.set('legendary', data);
      } else {
        currentSelectedLegendary.value = undefined;
        filterMap.value.delete('legendary');
      }
    }

    const onChangeType = (data: any) => {
      if (data) {
        filterMap.value.set('type', data);
      } else {
        currentSelectedType.value = undefined;
        filterMap.value.delete('type');
      }
    }

    const filterOptionsGenerations = new Array(6).fill(null).map((_, index: number) => ({
      value: index + 1,
      label: index + 1,
    }));

    const filterOptionsTypes = Object.keys(pokemonTypesMap).map((key: string) => ({
      value: Number(key),
      label: pokemonTypesMap[key],
    }));

    const filterOptionsLegendary = [
      {
        value: 0,
        label: 'Not Legendary',
      },
      {
        value: 1,
        label: 'Legendary',
      }
    ];

    watch(filterMap, (newValue) => {
      emit('change-filters', newValue);
    }, { deep: true });

    return {
      currentSelectedName,
      currentSelectedGeneration,
      currentSelectedLegendary,
      currentSelectedType,
      currentSelectedMinTotal,
      currentSelectedMaxTotal,
      currentSelectedMinSpeed,
      currentSelectedMaxSpeed,
      currentMinSpecialDefense,
      currentMaxSpecialDefense,
      currentMinSpecialAttack,
      currentMaxSpecialAttack,
      currentMinHP,
      currentMaxHP,
      currentMinAttack,
      currentMaxAttack,
      currentMaxDefense,
      currentMinDefense,
      filterOptionsGenerations,
      filterOptionsTypes,
      filterOptionsLegendary,
      isShowPokemonFilterModal,

      onShowPokemonFilterModal,
      onChangeGeneration,
      onChangeLegendary,
      onChangeType,
    }
  }
}

</script>

<style lang="scss" scoped>
.pokemon-filters {
  flex: 1 1 0;
  padding: 10px;
  min-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: $green;
  }
  .filters-title {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  .filters-button {
    height: 30px;
  }
}
</style>