<template>
  <div>
    <app-button @click="showPokemonDownloadSpriteModal">Click me!</app-button>
    <AppSelect v-model:value="currentSelect">
      <option value="">Select an option...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </AppSelect>
    <AppSort :listFields="listFields" @change-sort="handleSort($event as any)"/>
    <AppLoading v-if="true"/>
    <div class="pokemon-list" v-if="listItems?.length">
      <PokemonCard
        v-for="(item, index) in listItems" :key="index"
        :item="item"
      >
      </PokemonCard>
    </div>
  </div>
  <AppModal
    v-model:visible="isShowPokemonDetailsModal"
    :width="'50%'"
    :height="'50%'"
  />
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { PokemonItem } from '@/pokemon/api/type';
import { pokemonQuery } from '@/pokemon/composables/useQueryPokemon';
import PokemonCard from '@/pokemon/components/PokemonCard.vue';
import AppLoading from '@/components/AppLoading.vue';
import AppModal from '@/components/AppModal.vue';
import AppButton from '@/components/AppButton.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppSort from '@/components/AppSort.vue';
import { ListFieldSort } from '@/type';

export default {
  components: {
    AppLoading,
    AppModal,
    PokemonCard,
    AppSelect,
    AppSort,
  },
  setup() {
    const listItems = ref<PokemonItem[]>();
    const { useQueryPokemonItem } = pokemonQuery;
    const sortInfos = ref<string>();
    const { data: pokemonItems, isFetching, refetch } = useQueryPokemonItem();
    const isShowPokemonDetailsModal = ref<boolean>(false);
    const currentSelect = ref<string>('option1');

    const listFields: ListFieldSort[] = [
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
    ]

    const showPokemonDownloadSpriteModal = () => {
      isShowPokemonDetailsModal.value = true;
    }

    const handleSort = (data: { field: string, dir: string }) => {
      sortInfos.value = data.dir === 'desc' ? data.field : `-${data.field}`;
      console.log(sortInfos.value, 'sortInfos.value..');
    }

    onMounted(() => {
      refetch();
    });

    watch(pokemonItems, () => {
      listItems.value = pokemonItems.value || [];
    }, { immediate: true, deep: true });

    return {
      listItems,
      isFetching,
      pokemonItems,
      isShowPokemonDetailsModal,
      currentSelect,
      handleSort,
      listFields,

      showPokemonDownloadSpriteModal,
    }
  },
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  background-color: red;
  display: grid;
  grid-template-columns: repeat(3, auto);
}
</style>