<template>
  <div 
    class="search-container" 
    :class="{'search-container--disabled': disabled}">
    <input
      class="search-input"
      :type="type"
      v-model="searchVal"
      :placeholder="placeholder"
    />
    <app-icon 
      class="search-icon" 
      name="search"

      @click.stop="onUpdateSearch"
    />
  </div>
</template>

<script lang="ts">
import { SetupContext, ref } from 'vue';

type Props = {
  placeholder?: string
  disabled?: boolean,
  type?: string,
}
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search here..'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    }
  },
  emits: ['search'],
  setup(props: Props, { emit }: SetupContext) {
    const searchVal = ref<string>('');

    const onUpdateSearch = () => {
      console.log(searchVal.value, 'onUpdateSearch..');
      // console.log(searchVal.value, 'searchVal.value...');
      emit('search', searchVal.value);
    }

    return {
      searchVal,

      onUpdateSearch,
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}

.search-container {
  display: block;
  // width: 350px;
  max-width: 300px;
  max-height: 30px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
  rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: relative;
  &--disabled {
    opacity: 0.8;
    pointer-events: none;
    &:hover {
      cursor: not-allowed !important;
    }
  }
  .search-input {
    border: none;
    padding: 10px;
    width: 100%;
    height: 100%;
  }
  .search-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 2;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>