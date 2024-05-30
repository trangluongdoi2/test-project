<template>
  <div class="pokemon-details">
    <div class="pokemon-overview">
      <div class="name">{{ item.name }}</div>
      <div class="legendary" v-if="isLegendary">
        Legendary
      </div>
      <div class="hp">HP {{ item.hp }}</div>
    </div>
    <div class="pokemon-image">
      <img :src="item.src" loading="lazy"/>
    </div>
    <div class="pokemon-content">
      <div class="pokemon-type">
        <div class="type">
          <div class="type-icon">
            <app-icon :name="(item.type_1 as any as string).toLocaleLowerCase()" />
          </div>
          <div class="type-text" :style="{ color: colorByType1 }">{{ item.type_1 }}</div>
        </div>
        <div v-if="item.type_2" class="type">
          <div class="type-icon">
            <app-icon :name="(item.type_2 as any as string).toLocaleLowerCase()" />
          </div>
          <div class="type-text" :style="{ color: colorByType2 }">{{ item.type_2 }}</div>
        </div>
      </div>
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
import { PropType, computed } from 'vue';
import { PokemonDetails } from '../api/type';
import { pokemonColorByTypeMap } from '@/common/constant';

type Props = {
  item: PokemonDetails,
}

export default {
  props: {
    item: {
      type: Object as PropType<PokemonDetails>,
      required: true,
    },
  },
  setup(props: Props) {
    const colorByType1 = computed(() => {
      // @ts-ignore
      return pokemonColorByTypeMap[props.item.type_1];
    });

    const colorByType2 = computed(() => {
      // @ts-ignore
      return pokemonColorByTypeMap?.[props.item.type_2] || 'transparent';
    });

    const isLegendary = computed(() => props.item.legendary === 1);

    return {
      colorByType1,
      colorByType2,
      isLegendary,
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-details {
  width: 300px;
  height: 450px;
  border: 10px solid v-bind(colorByType1);
  border-radius: 10px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  .pokemon-overview {
    display: flex;
    padding: 8px;
    justify-content: space-between;
    gap: 8px;
    .name {
      font-size: 18px;
      font-weight: bold;
      font-style: italic;
      margin-left: 4px;
    }
    .legendary {
      font-size: 18px;
      font-weight: bold;
      margin-left: 4px;
      background: linear-gradient(315deg, #db1b85 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .hp {
      font-size: 18px;
      font-weight: bold;
      color: red;
    }
  }
  .pokemon-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(315deg, #647eff 1%, v-bind(colorByType1) 30%, #647eff);
    transition: transform 0.4s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .pokemon-content {
    padding: 8px;
    flex: 1 1 0;
    overflow-y: auto;
    .pokemon-type {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      font-weight: bold;
      .type {
        &-text {
          font-size: 12px;
        }
        &-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>