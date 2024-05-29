<template>
  <AppModal
    v-model:visible="visibleVal"
    :width="'50%'"
  >
    <template v-slot:header><h1 class="title">Pokemon Card</h1></template>
    <template v-slot:content>
      <div class="content">
        <AppLoading v-if="isLoading" :isLoading="isLoading" />
        <PokemonDetails v-else :item="item"/>
      </div>
    </template>
    <template v-slot:footer>
      <app-button @click="$emit('download-sprite', item.id)">Download Here</app-button>
    </template>
  </AppModal>
</template>

<script lang="ts">
import AppModal from '@/components/AppModal.vue';
import { PropType, SetupContext, onMounted } from 'vue';
import { PokemonDetails as TPokemonDetails } from '../api/type';
import { useModelWrapper } from '@/composables/useModelWrapper';
import PokemonDetails from './PokemonDetails.vue';
import AppLoading from '@/components/AppLoading.vue';

type Props = {
  visible: boolean,
  item: TPokemonDetails,
  isLoading: boolean,
}

export default {
  emits: ['download-sprite', 'update:visible'],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as PropType<TPokemonDetails>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal,
    AppLoading,
    PokemonDetails,
  },
  setup(props: Props, { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'visible');

    onMounted(() => {
      // console.log(props.item, 'props.item...');
      const src = props.item.src;
      // console.log(src, 'src..');
    });

    return {
      visibleVal,
    }

   
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>