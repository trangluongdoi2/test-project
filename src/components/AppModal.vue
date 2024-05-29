<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-mask" @click="onCloseModal">
      <div class="modal-wrapper" @click.stop>
        <div class="modal-container" ref="target">
          <div class="modal-header">
            <div class="header-actions">
              <slot class="header-title" name="header"></slot>
              <app-button class="button-close" @click.stop="onCloseModal" >
                <app-icon name="close" />
              </app-button>
            </div>
          </div>
          <div class="modal-body">
            <slot name="content">App Modal</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div>
                <app-button @click.stop="$emit('close')">Submit</app-button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext, computed } from 'vue';

export type Props = {
  visible: boolean,
  width?: number | string,
  height?: number | string,
}

export default {
  name: 'AppModal',
  props: {
    visible: {
      type: Boolean,
      required: false,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
  },
  emits: ['update:visible', 'close'],
  setup(props: Props, { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'visible');
    const widthVal = computed(() => {
      if (typeof props.width === 'string') {
        return props.width;
      } else if (typeof props.width === 'number') {
        return `${props.width}px`;
      }
      return '80%';
    });

    const heightVal = computed(() => {
      if (typeof props.height === 'string') {
        return props.height;
      } else if (typeof props.height === 'number') {
        return `${props.height}px`;
      }
      return '80%';
    });
    
    const onCloseModal = () => {
      visibleVal.value = false;
      emit('close');
    }

    return {
      visibleVal,
      widthVal,
      heightVal,

      onCloseModal,

    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  .modal-wrapper {
    width: v-bind(widthVal);
    // height: v-bind(heightVal);
    background-color: white;
    border-radius: 10px;
    .modal-container {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 10px;
      flex-direction: column;
    }
    .modal-body {
      // flex: 1 1 0;
    }
    .modal-header {
      max-height: 60px;
      height: 60px;
      // .header-title {
      //   text-align: center;
      // }
      .header-actions {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .button-close {
          width: 30px;
          min-height: 30px;
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
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>