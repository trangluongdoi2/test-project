<template>
  <select class="select-container" v-model="selectedValue" @change="handleChange">
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext } from 'vue';

export type Props = {
  value?: string | number,
}
export default {
  emits: ['update:value', 'change'],
  props: {
    value: {
      type: [String, Number],
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const selectedValue = useModelWrapper(props, emit, 'value');
    const handleChange = (event: Event) => {
      const { value } = event.target as any;
      selectedValue.value = value;
      emit('change', selectedValue.value);
    }

    return {
      selectedValue,

      handleChange,
    }
  }
}

</script>

<style lang="scss" scoped>
.select-container {
  height: 30px;
}
</style>