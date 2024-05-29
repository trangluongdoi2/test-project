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
      :type="'number'"

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
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  .filter-checkbox {
    width: 100px;
  }
  .filter-search {
    flex: 1 1 0;
  }
}
</style>