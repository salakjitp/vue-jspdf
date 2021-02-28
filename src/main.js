import Vue from 'vue'
import App from './App.vue'
import '@/Prompt-normal.js';
import '@/Sarabun-normal.js';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
