<template>
  <div  class="search-wrapper" :class="{'search-wrapper--disabled': disabled}">
    <div v-if="label" class="search-label">{{ label }}:</div>
    <div class="search-container">
      <input
        class="search-input"
        :type="type"
        v-model="searchVal"
        :placeholder="placeholder"
        :style="inputStyles"
        @blur="onUpdateSearch"
        @keydown="handleKeyDown"
      />
      <div class="search-icon" v-if="!hiddenIcon">
        <app-icon
          name="search"
          size="20"
    
          @click.stop="onUpdateSearch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext, computed, ref } from 'vue';

type Props = {
  placeholder?: string
  disabled?: boolean,
  type?: string,
  hiddenIcon?: boolean,
  label?: string,
  defaultValue?: string | number
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
    },
    hiddenIcon: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String, 
      default: ''
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    },
  },
  emits: ['search'],
  setup(props: Props, { emit }: SetupContext) {
    const searchVal = ref<string>((props.defaultValue || '')?.toString());

    const onUpdateSearch = () => {
      if (searchVal.value || Number(searchVal.value) === 0) {
        emit('search', searchVal.value);
      } else {
        searchVal.value = props.defaultValue as any;
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        emit('search', searchVal.value);
      }
    }

    const inputStyles = computed(() => {
      if (props.hiddenIcon) {
        return {
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
        }
      };
      return '';
    })

    return {
      searchVal,
      inputStyles,

      onUpdateSearch,
      handleKeyDown,
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}

.search-wrapper {
  display: block;
  max-width: 300px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  &--disabled {
    opacity: 0.8;
    pointer-events: none;
    &:hover {
      cursor: not-allowed !important;
    }
  }
  .search-container {
    position: relative;
    display: flex;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 4px;
    .search-input {
      border-radius: 4px;
      border: 2px solid transparent;
      max-height: 30px;
      padding: 10px;
      width: 100%;
      height: 100%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      &:focus-visible, &:focus {
        border: 2px solid #1677ff;
        outline: unset;
      }
    }
    .search-icon {
      background-color: $white;
      width: 30px;
      border-left: 1px solid gray;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .search-label {
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    min-height: 16px;
  }
}
</style>