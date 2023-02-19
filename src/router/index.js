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
        name: 'Users',
        component: () => import('@/views/panel/UsersModule/Users'),
      },
      {
        path: 'users/create',
        name: 'Create User',
        component: () => import('@/views/panel/UsersModule/CreateUser'),
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/panel/Client/Clients'),
      },
      {
        path: 'clients/create',
        name: 'Create Client',
        component: () => import('@/views/panel/Client/CreateClient'),
      },
      {
        path: 'crews',
        name: 'crews',
        component: () => import('@/views/panel/Crew/Crews'),
      },
      {
        path: 'crews/create',
        name: 'Create Crew',
        component: () => import('@/views/panel/Crew/CreateCrew'),
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
      // Authentication
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/panel/Auth/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/panel/Auth/Register'),
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
