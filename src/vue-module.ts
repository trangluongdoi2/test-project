import {
  Directive,
  DirectiveBinding,
  VNode,
  createApp,
  h,
} from 'vue';
import { onClickOutSide } from './directives/onClickOutSide';
import AppIcon from './components/AppIcon.vue';
import AppButton from './components/AppButton.vue';

export default function registerVueModule(
  defineComponent: any,
  plugins: any,
  modules: any = [],
) {
  const app = createApp({
    render() {
      return (h(defineComponent));
    },
    setup() {
    },
  });

  app.directive('click-outside', onClickOutSide);
  app.component('app-icon', AppIcon);
  app.component('app-button', AppButton);
  Object.values(plugins).forEach((plugin: any) => app.use(plugin));
  app.mount('#app');
}