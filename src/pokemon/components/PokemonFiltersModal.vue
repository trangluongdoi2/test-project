<template>
  <AppModal
    v-model:visible="visibleVal"
    :width="'50%'"
  >
    <template v-slot:content>
    </template>
    <template v-slot:footer>
      <app-button @click="handleFilters">Search</app-button>
    </template>
  </AppModal>
</template>

<script lang="ts">
import AppModal from '@/components/AppModal.vue';
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext, onMounted } from 'vue';

type Props = {
  visible: boolean,
}
export default {
  components: {
    AppModal,
  },
  emits: ['update:visible'],
  setup(props: Props, { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'visible');

    const handleFilters = () => {
      console.log('handleFilters...');
    }

    // onMounted(() => {
    //   console.log('PokemonFiltersModal...');
    // });

    return {
      visibleVal,

      handleFilters,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>