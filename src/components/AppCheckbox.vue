<template>
  <label class="wrapper">
    <span class="label-text"> {{ label }}</span>
    <input class="checkbox" type="checkbox" v-model="isChecked" @change="updateInput"/>
    <span class="checkmark"></span>
  </label>
</template>

<script lang="ts">
import { useModelWrapper } from '@/composables/useModelWrapper';
import { SetupContext } from 'vue';

type Props = {
  value: string,
  label: string,
  checked: boolean,
  id: string,
  disabled: boolean,
}
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:checked'],
  setup(props: Props, { emit }: SetupContext) {
    const isChecked = useModelWrapper(props, emit, 'checked');

    const updateInput = () => {
      emit('change');
    }

    return {
      isChecked,

      updateInput,
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  .label-text {
    text-overflow: ellipsis;
    word-break: break-all;
  }
}
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper:hover input ~ .checkmark {
  background-color: #ccc;
}
.wrapper input:checked ~ .checkmark {
  background-color: #1677ff;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.wrapper input:checked ~ .checkmark:after {
  display: block;
}
.wrapper .checkmark:after {
  left: 6px;
  top: 1px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>