import { Directive, DirectiveBinding } from "vue";

export const onClickOutSide: Directive = {
  beforeMount(el: any, binding: DirectiveBinding) {
    el.clickOutsideEvent = function(event: any) {
      if (!(el === event.target || el.contains(event.target))) {
          // Invoke the provided method
          binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
},
}