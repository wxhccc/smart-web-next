import { createRouter, createWebHashHistory, NavigationGuardWithThis } from 'vue-router'
import Layout from '@/layouts/layout.vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { useAppStore, useUserStore } from '@/store'

const isDev = import.meta.env.DEV

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    /* 后台框架页面 */
    {
      path: '/',
      name: 'Admin',
      component: () => import('@/layouts/admin-layout/index.vue'),
      children: [
        {
          path: ':lastPath?',
          name: 'AdminIndex',
          component: () => import('@/views/admin-index.vue')
        },
        // 测试组件用页面
        ...(isDev
          ? [
              {
                path: 'test',
                name: 'TestPage',
                component: () => import('@/views/test-page.vue')
              }
            ]
          : [])
      ]
    },
    /* 全屏页面，无登陆限制页面 */
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/index.vue')
        },
        {
          path: '404',
          name: 'Page404',
          component: () => import('@/views/page-404.vue')
        }
      ]
    },
    {
      path: '/:notFound(.*)*',
      name: 'RouteNotFound',
      redirect: '/404'
    }
  ]
})

/** 离开页面前如果目的路由需要设置记录则记录到vuex，然后在返回时利用记录路由值恢复之前页面状态 **/
const setRemember: NavigationGuardWithThis<void> = (to, from, next) => {
  const store = useAppStore()
  if (to.name && from.name && to.name === from.name) {
    next()
    return
  }
  if (to.meta.remember) {
    store.rememberRoute = (from.name || '') as string
  }
  const remember =
    (from.meta.remember || !from.name) && (!store.rememberRoute || to.name === store.rememberRoute)
  store.remember = !!remember
  next()
}
/** 全局路由前置守卫，用来控制登陆鉴权和页面跳转限制 **/
router.beforeEach((to, from, next) => {
  NProgress.start()
  const store = useAppStore()
  const authStore = useUserStore()
  store.customPageTitle = ''
  // 如果未登录，判断跳转路由是否是需登陆路由，如果是跳回到登陆页，否则允许跳转
  if (!authStore.isLogin) {
    to.name === 'Login' ? next() : next({ name: 'Login' })
    NProgress.done()
  } else {
    // 如果已登录，判断跳转路由是否是登陆页，如果是跳回到后台首页，否则允许跳转
    if (to.name === 'Login' || to.name === 'Page404') {
      // 如果当前页面是在后台首页，阻止跳转并停止跳转动画，否则跳转到首页
      if (from.name === 'AdminIndex') {
        NProgress.done()
        next(false)
      } else {
        const { fullPath } = to.redirectedFrom || { fullPath: '' }
        next({ name: 'AdminIndex', params: { lastPath: fullPath } })
      }
    } else {
      setRemember(to, from, next)
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

router.onError((error) => {
  console.error(error)
})

export default router
