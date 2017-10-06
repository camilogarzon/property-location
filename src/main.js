import config from './config.js'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(Vuelidate);
Vue.use(VueGoogleMaps, { load: { key: config.googleMapsKey } });
Vue.filter('json', x => JSON.stringify(x));

new Vue({
  el: '#app',
  render: h => h(App)
});
