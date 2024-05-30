<template>
  <Transition :name="direction">
    <div class="drawer-wrapper" v-if="visibleVal">
      <div class="drawer-container">
        <div class="drawer-header">
          <div class="header-actions">
            <slot class="header-title" name="header" />
            <app-icon class="button-close" name="close" @click.stop="onCloseDrawer"/>
          </div>
        </div>
        <div class="drawer-body">
          <slot name="content">App Drawer</slot>
        </div>
        <div class="drawer-footer">
          <slot name="footer">
            <div>
              <app-button @click.stop="$emit('close')">Submit</app-button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { PropType, SetupContext } from 'vue';

export type Direction = 'fade-up' | 'fade-down' | 'fade-right' | 'fade-left';

type Props = {
  direction: Direction
  modelValue: boolean
}
export default {
  emits: ['close', 'update:modelValue'],
  props: {
    direction: {
      type: String as PropType<Direction>,
      default: 'fade-right',
    },
    modelValue: {
      type: Boolean,
      required: true,
    }
  },
  setup(props: Props,  { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'modelValue');

    const onCloseDrawer = () => {
      visibleVal.value = false;
      emit('close');
    }
    
    return {
      visibleVal,

      onCloseDrawer,
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: gray;
}
.drawer-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: gray;
  .drawer-header {
    max-height: 30px;
    height: 30px;
    .header-actions {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .button-close {
        width: 16px;
        min-height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 50%;
        border: none;
      }
    }
  }
  .drawer-body {
    flex: 1 1 0;
  }
  .drawer-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
}
</style>