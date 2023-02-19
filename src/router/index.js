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
        component: () => import('@/views/panel/User/Users'),
      },
      {
        path: 'users/create',
        name: 'Create User',
        component: () => import('@/views/panel/User/CreateUser'),
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
      {
        path: 'contracts',
        name: 'contracts',
        component: () => import('@/views/panel/Contract/Contracts'),
      },
      {
        path: 'contracts/create',
        name: 'Create Contract',
        component: () => import('@/views/panel/Contract/CreateContract'),
      },
      {
        path: 'documents',
        name: 'documents',
        component: () => import('@/views/panel/Document/Documents'),
      },
      {
        path: 'documents/create',
        name: 'Create Document',
        component: () => import('@/views/panel/Document/CreateDocument'),
      },
      // Services menu
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/panel/Service/Services/Services'),
      },
      {
        path: 'services/create',
        name: 'Create Service',
        component: () => import('@/views/panel/Service/Services/CreateService'),
      },
      {
        path: 'services/commits',
        name: 'Service Commits',
        component: () => import('@/views/panel/Service/Commits/Commits'),
      },
      {
        path: 'services/commits/create',
        name: 'Create Commit',
        component: () => import('@/views/panel/Service/Commits/CreateCommit'),
      },
      {
        path: 'services/logs',
        name: 'Service Logs',
        component: () => import('@/views/panel/Service/Logs/Logs'),
      },
      {
        path: 'services/logs/create',
        name: 'Create Log',
        component: () => import('@/views/panel/Service/Logs/CreateLog'),
      },
      // Services Menu ends here
      {
        path: 'phases',
        name: 'Phases',
        component: () => import('@/views/panel/Phase/Phases'),
      },
      {
        path: 'phases/create',
        name: 'Create Phase',
        component: () => import('@/views/panel/Phase/CreatePhase'),
      },
      {
        path: 'groups',
        name: 'groups',
        component: () => import('@/views/panel/Group/Groups'),
      },
      {
        path: 'groups/create',
        name: 'Create Group',
        component: () => import('@/views/panel/Group/CreateGroup'),
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: () => import('@/views/panel/Vehicle/Vehicles'),
      },
      {
        path: 'vehicles/create',
        name: 'Create Vehicle',
        component: () => import('@/views/panel/Vehicle/CreateVehicle'),
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
