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
    <AppRadioGroup :options="options" @change="setOrderSort($event as any)"/>
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

    const setOrderSort = (dir: string) => {
      direction.value = dir as any;
    }

    watch([field, direction], ([newField, newOrder]: [any, any], [oldField, oldOrder]: [any, any]) => {
      if (newField === oldField && newOrder === oldOrder) {
        return;
      }
      emit('change-sort', {
        field: newField,
        orderSort: newOrder,
      })
    })

    return {
      direction,
      field,
      options,

      setOrderSort,
    };
  }
}
</script>
<style lang="scss" scoped>

</style>