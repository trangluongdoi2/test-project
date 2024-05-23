<template>
  <select v-model="selectedValue" @change="handleChange">
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext } from 'vue';

export type Props = {
  value: string | number,
}
export default {
  emits: ['update:value'],
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const selectedValue = useModelWrapper(props, emit, 'value');
    const handleChange = (event: Event) => {
      const { value } = event.target as any;
      selectedValue.value = value;
    }

    return {
      selectedValue,

      handleChange,
    }
  }
}

</script>

<style scoped>

</style>