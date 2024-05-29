<template>
  <label class="wrapper">
    {{ label }}
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
  padding-left: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Hide the browser's default checkbox */
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* On mouse-over, add a grey background color */
.wrapper:hover input ~ .checkmark {
  background-color: #ccc;
}
/* When the checkbox is checked, add a blue background */
.wrapper input:checked ~ .checkmark {
  background-color: #1CD4A7;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.wrapper input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.wrapper .checkmark:after {
  left: 7px;
  top: 0px;
  width: 4px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>