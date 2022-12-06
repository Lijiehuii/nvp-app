import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import MineView from '@/views/MineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      component: HomeView
    },
    {
      path: '/discover',
      name: 'discover',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      component: DiscoverView
    },
    {
      path: '/mine',
      name: 'mine',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      component: MineView
    },
    {
      path: '/userinfo/:id',
      name: 'userinfo',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      // 将路由的 parmas 用 props 的形式传递到子组件
      props: true,
      component: () => import('@/views/UserInfoView.vue')
    },
    {
      path: '/video/:id',
      name: 'video',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      // 将路由的 parmas 用 props 的形式传递到子组件
      props: true,
      component: () => import('@/views/VideoDetailView.vue')
    },
    {
      path: '/cate/:catename/:id',
      name: 'cate',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      props: true,
      component: () => import('@/views/DiscoverCateListView.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
      },
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/myfollow',
      name: 'myfollow',
      component: () => import('@/views/MyFollowUser.vue')
    },
    {
      path: '/mycollection',
      name: 'mycollection',
      component: () => import('@/views/MyCollection.vue')
    },
    {
      path: '/myfootprint',
      name: 'myfootprint',
      component: () => import('@/views/MyFootprint.vue')
    }
  ]
})

export default router
