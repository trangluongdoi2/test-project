<template>
  <label>
    <input
      type="radio"
      :value="value"
      v-model="currentValue"
      @change="handleChange"
      v-bind="$attrs"
    >
    {{ label }}
  </label>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext } from 'vue';

type Props = {
  value: string,
  label: string,
}

export default {
  emits: ['update:value'],
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },
  setup(props: Props, { emit }: SetupContext) {
    const currentValue = useModelWrapper(props, emit, 'value');
    const handleChange = (event: any) => {
      console.log(event, 'event...');
      // console.log(event.target.value, '');
    }

    return {
      currentValue,

      handleChange,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>