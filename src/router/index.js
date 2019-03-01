import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
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

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        hideMainHeader: false
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  // if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
  //   if(userName) {
  //     next({ path: '/home' })
  //   } else {
  //     next()
  //   }
  // } else {
    // if (!userName) {
    //   // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    //   next({ path: '/login' })
    // } else {
    //   // 加载动态菜单和路由
    //   // addDynamicMenuAndRoutes(userName, to, from)
    //   next()
    // }
    if (to.meta.requestAuth) {
        if (userName) {
          next();
        } else {
          next({ path: '/login' });
        }
    } else {
      next();
    }
  })


export default router
