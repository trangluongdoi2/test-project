<template>
  <label v-for="option in options" :key="option.value">
    <input
      type="radio"
      :value="option.value"
      v-model="selectedValue"
      @change="handleChange"
    />
    {{ option.label }}
  </label>
</template>

<script lang="ts">
import { PropType, SetupContext, ref } from 'vue';

type Props = {
  options: Array<{ label: string, value: string | number }>
}

export default {
  emits: ['change'],
  props: {
    options: {
      type: Array as PropType<Array<{ label: string, value: string | number }>>,
      required: true,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const selectedValue = ref<string | number>(props.options[0].value);

    const handleChange = () => {
      emit('change', selectedValue.value);
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