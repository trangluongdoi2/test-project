<template>
  <div class="pokemon-card__container" @click="onShowDetail(item.id)">
    <div class="card-name">{{ item.name }}</div>
    <div class="card-type">
      <div class="card-type1">{{ item.type_1 }}</div>
      <div v-if="item.type_2" class="card-type2">| {{ item.type_2  }}</div>
    </div>
    <div>{{ item.number }}</div>
    <div>Generation: {{ item.generation }}</div>
    <div>Total: {{ item.total }}</div>
    <div class="card-created">{{ formatDate(item.created_at) }}</div>
    <div class="card-updated">{{ formatDate(item.updated_at) }}</div>
  </div>
</template>

<script lang="ts">
import { PropType, SetupContext, computed, onMounted } from 'vue';
import { formatDate } from '@/common/date';
import { PokemonItem } from '../api/type';
import useLocalStorage from '../store/useLocalStorage';

type Props = {
  item: PokemonItem,
}

export default {
  emits: ['show-detail'],
  props: {
    item: {
      type: Object as PropType<PokemonItem>,
      required: true
    }
  },
  setup(props: Props, { emit }: SetupContext) {
    const onShowDetail = (id: string) => {
      emit('show-detail', id);
    }

    const type1Pokemon = computed(() => {
      return 'Glass';
    });

    const type2Pokemon = computed(() => {
      return 'Fire';
    })

    return {
      type1Pokemon,
      type2Pokemon,

      formatDate,
      onShowDetail,
    }
   
  },
}
</script>

<style lang="scss" scoped>
@keyframes suspended {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.pokemon-card__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #42b883;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    animation: suspended 2s linear infinite;
  }
  .card {
    &-name {
      font-weight: bold;
    }
    &-type {
      display: flex;
    }
    &-type1, &-type2 {
      color: red;
      font-weight: bold;
      font-style: italic;
    }
  }
}

</style>