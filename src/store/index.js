import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
// import user from './user/';
// import cart from './cart/';
Vue.use(Vuex);

// Vue.prototype.$http = axios.create({
//   timeout: 60000
// });

const state = {
  showHeader:true,
  changebleNum:0
};
const getters = {
  isShow(state){
    return state.showHeader
  },
  getChangedNum(){
    return state.changebleNum
  }
};
const mutations = {
  show(state){
    state.showHeader = true;
  },
  hide(state){
    state.showHeader = false;
  },
  newNum(state,sum){
    state.changebleNum += sum;
  }
};
const actions = {
  hideHeader(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('hide');
  },
  showHeader(context) {  //同上注释
    context.commit('show');
  },
  getNewNum(context,num){   //同上注释，num为要变化的形参
    context.commit('newNum',num)
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});


export default store;
// export default new Vuex.Store({
//   modules: {
//     // user,
//     // cart
//   }
// });
