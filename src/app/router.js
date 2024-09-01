import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage/ui/MainPage.vue'
import ResultsPage from '@/pages/ResultsPage/ui/ResultsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsPage,
    props: route => ({ answers: route.query.answers })
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
