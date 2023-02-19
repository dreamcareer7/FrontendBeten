import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import jwt_decode from 'vue-jwt-decode'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [

  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      // Other Pages
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/panel/UsersModule/Users.vue'),
      },
      {
        path: 'users/create',
        name: 'create_user',
        component: () => import('@/views/panel/UsersModule/CreateUser.vue'),
      },
    ],
  },
  {
    path: '/panel',
    redirect: '/panel/404',
    name: 'Panel',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      // {
      //   path: '404',
      //   name: 'Page404',
      //   component: () => import('@/views/panel/Page404'),
      // },
      // {
      //   path: '500',
      //   name: 'Page500',
      //   component: () => import('@/views/panel/Page500'),
      // },

      // Authentication
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/panel/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/panel/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const token = localStorage.getItem('betenAuthToken')
//     if (!token) {
//       next({
//         path: '/panel/login'
//       })
//     } else {
//       const decoded = jwt_decode(token)
//       const currentTime = Date.now() / 1000
//       if (decoded.exp < currentTime) {
//         localStorage.removeItem('betenAuthToken')
//         next({
//           path: '/panel/login'
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })

export default router
