import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/distributions',
      name: 'distributions',
      component: () => import('../views/distributions/DistributionsView.vue')
    },
    {
      path: '/distributions/:id',
      name: 'distribution-detail',
      component: () => import('../views/distributions/DistributionDetailView.vue')
    },
    {
      path: '/tips',
      name: 'tips',
      component: () => import('../views/tips/TipsView.vue')
    },
    {
      path: '/tips/:id',
      name: 'tip-detail',
      component: () => import('../views/tips/TipDetailView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/news/NewsView.vue')
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('../views/news/NewsDetailView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // Terminal-based routes
    {
      path: '/terminal',
      name: 'terminal',
      component: () => import('../components/TerminalView.vue')
    },
    {
      path: '/terminal/tips',
      name: 'terminal-tips',
      component: () => import('../components/TerminalView.vue')
    },
    {
      path: '/terminal/news',
      name: 'terminal-news',
      component: () => import('../components/TerminalView.vue')
    },
    {
      path: '/terminal/tips/:id',
      name: 'terminal-tip-detail',
      component: () => import('../components/TerminalView.vue')
    },
    {
      path: '/terminal/news/:id',
      name: 'terminal-news-detail',
      component: () => import('../components/TerminalView.vue')
    },
    {
      path: '/terminal/:cmd(.*)*',
      name: 'terminal-unknown',
      component: () => import('../components/TerminalView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router