import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import Home from '@/views/home/home'
import NotFound from '@/views/error/404'
import Test from '@/views/test/Test'
import Register from '@/views/login/register'
import Khome from '@/views/kitty/home'
import Demo from '@/views/test/demo'
import goodsList from '@/views/goods/goods-list'
import userCart from '@/views/user/user-cart'
import orderConfirm from '@/views/order/confirm'
import orderPayment from '@/views/order/payment'
import goodsDetail from '@/views/goods/goods-detail'
import orderDetail from '@/views/order/detail'
import userCenter from '@/views/user/user-center'
import about from '@/views/about'
import userOrder from '@/views/user/user-order'
import userCenterUpdate from '@/views/user/user-center-update'
import userPassUpdate from '@/views/user/user-pass-update'
import result from '@/views/result'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        hideMainHeader: false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        hideMainHeader: true
      },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
      meta: {
        hideMainHeader: true
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hideMainHeader: true
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },{
      path: '/kitty/home',
      name: 'Khome',
      component: Khome
    },{
      path: '/demo',
      name: 'Demo',
      component: Demo
    },{
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList,
      meta: {
        name: '商品列表',
        requestAuth: false,
        hideMainHeader: false
      }
    },{
      path: '/userCart',
      name: 'userCart',
      component: userCart,
      meta: {
        name: '我的购物车',
        requestAuth: false,
        hideMainHeader: false
      }
    },{
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm,
      meta: {
        name: '订单确认',
        requestAuth: true,
        hideMainHeader: false
      }
    },{
      path: '/orderPayment',
      name: 'orderPayment',
      component: orderPayment,
      meta: {
        name: '支付订单',
        requestAuth: true,
        hideMainHeader: false
      }
    },{
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail,
      meta: {
        name: '商品详情',
        requestAuth: false,
        hideMainHeader: false
      }
    },{
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail,
      meta: {
        name: '订单详情',
        requestAuth: true,
        hideMainHeader: false
      }
    }, {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      meta: {
        name: '个人中心',
        requestAuth: true,
        hideMainHeader: false
      }
    },{
      path: '/about',
      name: 'about',
      component: about,
      meta: {
        name: '关于熊猫海外代购',
        hideMainHeader: false
      }
    },{
      path: '/userOrder',
      name: 'userOrder',
      component: userOrder,
      meta: {
        name: '我的订单',
        hideMainHeader: false
      }
    },{
      path: '/userCenterUpdate',
      name: 'userCenterUpdate',
      component: userCenterUpdate,
      meta: {
        name: '修改个人信息',
        requestAuth: true,
        hideMainHeader: false
      }
    },{
      path: '/userPassUpdate',
      name: 'userPassUpdate',
      component: userPassUpdate,
      meta: {
        name: '修改密码信息',
        requestAuth: true,
        hideMainHeader: false
      }
    },{
      path: '/result',
      name: 'result',
      component: result,
      meta: {
        name: '操作结果',
        // requestAuth: true,
        hideMainHeader: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  //token 7天后失效
  let token = Cookies.get('token');
  if(to.path === '/login'){
    // 如果是访问登录界面，如果用户会话信息token存在，代表已登录过，跳转到主页
    if(token){
      next({path:'/'});
    }else {
      next();
    }
  }
  if (to.meta.requestAuth) {
        if (token) {
          next();
        } else {
          next({ path: '/login' });
        }
    } else {
      next();
    }
  });


export default router
