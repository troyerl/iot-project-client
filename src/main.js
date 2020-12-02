import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import store from './store';
import router from './router';

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
