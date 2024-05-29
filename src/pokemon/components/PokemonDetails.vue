<template>
  <div class="pokemon-details">
    <div class="pokemon-overview">
      <div class="">{{ item.type_1 }}</div>
      <div class="">{{ item.name }}</div>
    </div>
    <div class="pokemon-image">
      <img :src="item.src" loading="lazy"/>
    </div>
    <div class="pokemon-content">
      <p><strong>HP: </strong>{{ item.hp }}</p>
      <p><strong>Attack: </strong>{{ item.attack }}</p>
      <p><strong>Defense: </strong>{{ item.defense }}</p>
      <p><strong>Generation: </strong>{{ item.generation }}</p>
      <p><strong>Special Attack: </strong>{{ item.sp_atk }}</p>
      <p><strong>Special Defense: </strong>{{ item.sp_def }}</p>
      <p><strong>Speed: </strong>{{ item.speed }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, onMounted } from 'vue';
import { PokemonDetails } from '../api/type';

export default {
  props: {
    item: {
      type: Object as PropType<PokemonDetails>,
      required: true,
    },
  },
  setup(props: any) {
    const colorByType = computed(() => {
      return 'yellow';
    });

    return {
      colorByType,
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-details {
  width: 300px;
  height: 450px;
  border: 10px solid v-bind(colorByType);
  border-radius: 10px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  .pokemon-overview {
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
  }
  .pokemon-image {
    width: 100%;
    height: 200px;
    background-color: green;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .pokemon-content {
    padding-left: 8px;
    flex: 1 1 0;
    overflow-y: auto;
  }
}
</style>