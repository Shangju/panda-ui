// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index';
import VueRouter from 'vue-router';
import global from '@/utils/global';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import Mixin from './mixins';
// import store from './store';
// import 'font-awesome/css/font-awesome.css';



Vue.use(ElementUI);
Vue.use(api);
Vue.use(VueRouter);
Vue.use(axios);
Vue.use(VueLazyload);
Vue.mixin(Mixin);

Vue.config.productionTip = false

Vue.prototype.global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
