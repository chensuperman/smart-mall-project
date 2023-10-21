import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入一级路由组件
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search/index'
import SearchList from '@/views/search/list'
// 导入layout下的二级路由组件
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [

  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }

    ]
  },
  { path: '/myorder', component: MyOrder },
  { path: '/pay', component: Pay },
  // 动态路由传参，确认是哪一个商品
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/search', component: Search },
  { path: '/searchlist/', component: SearchList }

]

const router = new VueRouter({
  routes
})

// 全局前置导航守卫
// to : 到哪里去，到哪去的完整路由信息对象（路径，参数）
// from : 从哪里来，从哪来的完整路由信息对象（路径，参数）
// next():是否放行
// (1)next()     直接放行，放行到to要去的路径
// (2)next(路径) 进行拦载，拦截到next里面配置的路径

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 判断to.path是否在authUrls中出现
  if (!authUrls.includes(to.path)) {
    // 非权限页面
    next()
    return
  }

  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    Toast('请先登录')
    setTimeout(() => {
      next('/login')
    }, 2000)
  }
  // console.log(token)
})

export default router
