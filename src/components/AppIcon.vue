<template>
  <span
    role="img"
    :aria-label="ariaLabel"
    :class="spanClass"
    v-bind="{...$attrs}"
  >
    <component
      v-if="svgComponent"
      :is="svgComponent"
      aria-hidden="true"
      focusable="false"
      :class="{'svg': color || 'currentColor'}"
    >
    </component>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      :fill="color || 'currentColor'"
      :width="width || size"
      :height="height || size"
    >
      <path :d="iconPath"></path>
    </svg>
  </span>
</template>

<script lang="ts">
import { computed } from 'vue';
import { toPascalCase } from '@/common/string-utils';
import svg from '@/components/icons/svg';
import mdi from '@/components/icons/mdi';

export default {
  props: {
    width: [Number, String],
    height: [Number, String],
    ariaLabel: [String],
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props: any) {
    const name = computed(() => toPascalCase(props.name));
    const w = computed(() => `${props.width || props.size || 24}px`);
    const h = computed(() => `${props.height || props.size || 24}px`);

    const svgComponent = computed(() => {
      const icon = svg[props.name];
      if (!icon) {
        return undefined;
      }
      return icon;
    });

    const svgStyles = computed(() => {
      return ({
        width: `${props.width || props.size || 24}px`,
        height: `${props.height || props.size || 24}px`,
      });
    });

    const viewBox = computed(() => {
      return `0 0 ${props.width ?? props.size} ${props.height ?? props.size}`.replaceAll('px', '');
    });

    const iconPath = computed(() => mdi[`mdi${name.value}`]);
    const spanClass = computed(() => {
      const classValue: string[] = [];
      if (props.disable) {
        classValue.push('disable');
      }

      if (svgComponent.value) {
        classValue.push('app-icon');
        return classValue;
      }

      const mdiIcon = ['mdi', `mdi-${name.value}`, props.spin ? 'mdi-spin' : ''];

      mdiIcon.map((item: string) => classValue.push(item));
      return classValue;
    });

    return {
      viewBox,
      iconPath,
      spanClass,
      svgComponent,
      w,
      h,
      svgStyles,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-icon {
  display: inline-flex;
  vertical-align: middle;
  cursor: pointer;
  > svg {
    width: v-bind(w);
    height: v-bind(h);
  }
}

.disable {
  cursor: not-allowed;
}
.mdi > svg {
  vertical-align: middle;
}

.mdi.mdi-spin > svg {
  -webkit-animation: mdi-spin 2s infinite linear;
  -moz-animation: mdi-spin 2s infinite linear;
  animation: mdi-spin 2s infinite linear;
}

@-webkit-keyframes mdi-spin {
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
@keyframes mdi-spin {
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
</style>
