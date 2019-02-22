import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Test from '@/views/test/Test'
import Register from '@/views/login/register'
import Khome from '@/views/kitty/home'

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
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        hideMainHeader: true
      },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hideMainHeader: true
      },
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/kitty/home',
      name: 'Khome',
      component: Khome
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   // 登录界面登录成功之后，会把用户信息保存在会话
//   // 存在时间为会话生命周期，页面关闭即失效。
//   let userName = sessionStorage.getItem('user')
//   if (to.path === '/login') {
//     // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
//     if(userName) {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else {
//     if (!userName) {
//       // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
//       next({ path: '/login' })
//     } else {
//       // 加载动态菜单和路由
//       addDynamicMenuAndRoutes(userName, to, from)
//       next()
//     }
//   }
// })


export default router
