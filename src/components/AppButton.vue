<template>
  <button
    class="button-container"
    :class="{
      'button-container--active': isActive,
      'button-container--disabled': disabled,
      'button-container--loading': loading,
    }"
    v-bind="$attrs"
  >
    <app-icon name="loading" class="loading" v-if="loading"></app-icon>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export type Props = {
  disabled?: boolean,
  loading?: boolean,
  isActive?: boolean,
  type?: 'ghost' | 'primary' | string;
  // color?: string,
}
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: Props) {
    onMounted(() => {
    })
  }
});

</script>

<style lang="scss" scoped>
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.button-container {
  width: fit-content;
  padding: 4px;
  min-height: 40px;
  &--disabled, &--loading {
    pointer-events: none;
    opacity: 0.5;
  }
  &--active {
    background-color: $green;
  }
  border: 2px solid $green;
  border-radius: 4px;
  background-color: transparent;
  color: $white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  .loading {
    :deep(svg) {
      animation: loading 2s infinite linear;
    }
  }
}
</style>