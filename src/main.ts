import { VueQueryPlugin } from '@tanstack/vue-query';
import '@/styles/main.scss';
import App from './App.vue';
import registerVueModule from './vue-module';

const plugin = {
  VueQueryPlugin,
}
registerVueModule(App, plugin);