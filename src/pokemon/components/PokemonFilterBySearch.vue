<template>
  <div class="container-filter">
    <AppCheckbox
      class="filter-checkbox"
      v-model:checked="filterVal.enabled"
      :label="label"
      @change="handleChecked"
    />
    <AppSearch
      class="filter-search"
      v-model="filterVal.value" 
      :disabled="!filterVal.enabled" 
      :placeholder="`Search by ${label}`"
      :type="field === 'name' ? 'text' : 'number'"

      @search="handleSearch"
    />
  </div>
</template>

<script lang="ts">
import AppCheckbox from '@/components/AppCheckbox.vue';
import AppSearch from '@/components/AppSearch.vue';
import { SetupContext, ref } from 'vue';

type Props = {
  placeholder?: string,
  field: string,
  label: string,
}
export default {
  components: {
    AppCheckbox,
    AppSearch,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search here..'
    },
    field: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    }
  },
  emits: ['change-filters'],
  setup(props: Props, { emit }: SetupContext) {
    const searchVal = ref<string>('');
    const checkedVal = ref<boolean>(false);

    const filterVal = ref<{ enabled: boolean, value: string }>({
      enabled: false,
      value: '',
    })

    const handleSearch = (data: any) => {
      filterVal.value.value = data; 
      emit('change-filters', filterVal.value);
    }

    const handleChecked = () => {
      emit('change-filters', filterVal.value);
    }

    return {
      searchVal,
      checkedVal,
      filterVal,

      handleChecked,
      handleSearch,
    }
  }
}
</script>

<style lang="scss" scoped>
.container-filter {
  min-height: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-color: $green;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #f4f4f4;
  .filter-checkbox {
    width: 100px;
    min-height: 20px;
  }
}
</style>