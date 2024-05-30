<template>
  <div class="drawer-wrapper">
    <Transition :name="direction">
      <div class="drawer-animation">
        <div class="drawer-wrapper" v-if="visibleVal">
          <!-- <slot /> -->
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
      </div>
      <!-- <Teleport v-appear="visibleVal" to="body">
      </Teleport> -->
    </Transition>
  </div>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { PropType, SetupContext, onMounted, ref } from 'vue';

export type Direction = 'fade-up' | 'fade-down' | 'fade-right' | 'fade-left';

type Props = {
  visible: boolean,
  direction: Direction
}
export default {
  emits: ['update:visible', 'close'],
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'fade-right',
    },
  },
  setup(props: Props,  { emit }: SetupContext) {
    const visibleVal = useModelWrapper(props, emit, 'visible');
    const visbile = ref<boolean>(false);

    const onCloseDrawer = () => {
      visibleVal.value = false;
      emit('close');;
    }
    onMounted(() => {
      // console.log('onMounted AppDrawer');
      console.log(props.direction, 'onMounted AppDrawe..');
    });
    
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
  .drawer-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
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
    }
  }
}
.drawer-animation.fade-up-enter-from,
.drawer-animation.fade-down-enter-from,
.drawer-animation.fade-right-enter-from,
.drawer-animation.fade-left-enter-from {
  transition: none;
}

.fade-up-enter-active,
.fade-up-leave-active,
.fade-right-enter-active,
.fade-right-leave-active,
.fade-left-enter-active,
.fade-left-leave-active,
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-right-enter-from,
.fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-left-enter-from,
.fade-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-up-enter-from,
.fade-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.fade-down-enter-from,
.fade-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>