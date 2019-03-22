// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index';
import VueRouter from 'vue-router';
import global from '@/util/global';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import Mixin from './mixins';
import 'font-awesome/css/font-awesome.css';
import Bus from './vueBus';
import store from './store';
// import 'font-awesome/css/font-awesome.css';



Vue.use(ElementUI);
Vue.use(api);
Vue.use(Bus);
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-spinning-bubbles.svg',
  try: 3 // default 1
});
Vue.mixin(Mixin);

Vue.config.productionTip = false;

Vue.prototype.global = global
Vue.prototype.$axios = axios;
Vue.prototype.$pcBus = Bus;
//意思是携带cookie信息,保持session的一致性
axios.defaults.withCredentials = true;


Vue.prototype.$http = axios.create({
  timeout: 60000
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
