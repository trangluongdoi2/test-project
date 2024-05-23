<template>
  <div class="sort-container">
    <span>Sort by:</span>
    <AppSelect v-model:value="field">
      <option
        v-for="item in listFields"
        :key="item.field"
        :value="item.field"
      >
        {{ item.field.toUpperCase() }}
      </option>
    </AppSelect>
    <AppRadioGroup :options="options" @change="setDirection($event as any)"/>
  </div>
</template>

<script lang="ts">
import { PropType, SetupContext, ref, watch } from 'vue';
import AppRadio from './AppRadio.vue';
import AppSelect from './AppSelect.vue';
import AppRadioGroup from './AppRadioGroup.vue';
import { ListFieldSort } from '@/type';

type Props = {
  listFields: ListFieldSort[],
}
export default {
  components: {
    AppRadio,
    AppSelect,
    AppRadioGroup,
  },
  props: {
    listFields: {
      type: Array as PropType<ListFieldSort[]>,
      default: () => ([]),
    },
  },
  emits: ['change-sort'],
  setup(props: Props, { emit }: SetupContext) {
    const field = ref<string>(props.listFields[0].field);
    const direction = ref<'asc' | 'desc'>('desc');
    const options = [
      {
        label: 'DESC',
        value: 'desc',
      },
      {
        label: 'ASC',
        value: 'asc',
      }
    ]

    const setDirection = (dir: string) => {
      direction.value = dir as any;
    }

    watch([field, direction], ([newField, newDirection]: [any, any], [oldField, oldDirection]: [any, any]) => {
      if (newField === oldField && newDirection === oldDirection) {
        return;
      }
      emit('change-sort', {
        field: newField,
        dir: newDirection,
      })
    })

    return {
      direction,
      field,
      options,

      setDirection,
    };
  }
}
</script>
<style lang="scss" scoped>

</style>