import { createRouter, createWebHistory, isNavigationFailure, NavigationFailureType } from 'vue-router'

import store from '@/store'
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
        name: 'create_user',
        component: () => import('@/views/panel/User/CreateUser'),
      },
      {
        path: 'users/edit/:id',
        name: 'edit_user',
        component: () => import('@/views/panel/User/UpdateUser'),
      },
      {
        path: 'users/info/:id',
        name: 'user_info',
        component: () => import('@/views/panel/User/UserInfo'),
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/panel/Client/Clients'),
      },
      {
        path: 'clients/create',
        name: 'create_client',
        component: () => import('@/views/panel/Client/CreateClient'),
      },
      {
        path: 'clients/edit/:id',
        name: 'update_client',
        component: () => import('@/views/panel/Client/UpdateClient'),
      },
      {
        path: 'crews',
        name: 'crews',
        component: () => import('@/views/panel/Crew/Crews'),
      },
      {
        path: 'crews/create',
        name: 'Create_Crew',
        component: () => import('@/views/panel/Crew/CreateCrew'),
      },
      {
        path: 'crews/edit/:id',
        name: 'update_crew',
        component: () => import('@/views/panel/Crew/UpdateCrew'),
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
        name: 'create_service',
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
      // End Services Menu

      // Phases Menu
      {
        path: 'phases',
        name: 'All Phases',
        component: () => import('@/views/panel/Phase/Phases/Phases'),
      },
      {
        path: 'phases/create',
        name: 'Create Phase',
        component: () => import('@/views/panel/Phase/Phases/CreatePhase'),
      },
      {
        path: 'phases/services',
        name: 'Services',
        component: () => import('@/views/panel/Phase/Services/Services'),
      },
      {
        path: 'phases/services/create',
        name: 'Create Phase Service',
        component: () => import('@/views/panel/Phase/Services/CreateService'),
      },
      // End Phases Menu


      // Meals Menu
      {
        path: 'meals',
        name: 'All Meals',
        component: () => import('@/views/panel/Meal/Meals/Meals'),
      },
      {
        path: 'meals/create',
        name: 'Create Meal',
        component: () => import('@/views/panel/Meal/Meals/CreateMeal'),
      },
      {
        path: 'meals/types',
        name: 'Types',
        component: () => import('@/views/panel/Meal/Types/Types'),
      },
      {
        path: 'meals/types/create',
        name: 'Create Type',
        component: () => import('@/views/panel/Meal/Types/CreateType'),
      },

      // Meals Menu ends here

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
        path: 'groups/edit/:id',
        name: 'update_group',
        component: () => import('@/views/panel/Group/UpdateGroup'),
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: () => import('@/views/panel/Vehicle/Vehicles'),
        // Only users with permission "vehicles.index" shall access this route
        beforeEnter: (to, from, next) => {
          if (store.getters["auth/canIndexVehicles"]) next();
          else next(false);
        }
      },
      {
        path: 'vehicles/create',
        name: 'create_vehicle',
        component: () => import('@/views/panel/Vehicle/CreateVehicle'),
      },
      {
        path: 'vehicles/update/:id',
        name: 'update_vehicle',
        component: () => import('@/views/panel/Vehicle/UpdateVehicle'),
      },
      {
        path: 'dormitories',
        name: 'dormitories',
        meta: { requiresAuth: true },
        component: () => import('@/views/panel/Dormitory/Dormitories'),
        beforeEnter: (to, from, next) => {
        if (store.getters["auth/isAdmin"]) next();
          else next(false);
        }
      },
      {
        path: 'dormitories/create',
        name: 'create_dormitory',
        component: () => import('@/views/panel/Dormitory/CreateDormitory'),
      },
      {
        path: 'dormitories/update/:id',
        name: 'update_dormitory',
        component: () => import('@/views/panel/Dormitory/UpdateDormitory'),
      },
      {
        path: 'concurrents',
        name: 'concurrents',
        component: () => import('@/views/panel/Concurrent/Concurrents'),
      },
      {
        path: 'concurrents/create',
        name: 'Create Concurrent',
        component: () => import('@/views/panel/Concurrent/CreateConcurrent'),
      },
      // Hospitalities Menu
      {
        path: 'hospitalities',
        name: 'hospitalities',
        component: () => import('@/views/panel/Hospitality/Hospitalities/Hospitalities'),
      },
      {
        path: 'hospitalities/create',
        name: 'Create Concurrent',
        component: () => import('@/views/panel/Hospitality/Hospitalities/CreateHospitality'),
      },
      {
        path: 'hospitalities/transactions',
        name: 'Transactions',
        component: () => import('@/views/panel/Hospitality/Transactions/Transactions'),
      },
      {
        path: 'hospitalities/transactions/create',
        name: 'Create Transaction',
        component: () => import('@/views/panel/Hospitality/Transactions/CreateTransaction'),
      },
      // Hospitalities Menu ends here
    ],
  },
  {
    path: '/auth',
    redirect: '/404',
    name: 'Panel',
    children: [
      // Authentication
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/panel/Auth/Login'),
      },
      {
        path: 'reset',
        name: 'reset_password',
        component: () => import('@/views/panel/Auth/ResetPassword'),
      },
      {
        path: 'new_password/:hash',
        name: 'new_passport',
        component: () => import('@/views/panel/Auth/NewPassword'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/panel/Auth/Register'),
      },
    ],
  },
  { path: '/:pathMatch(.*)', component: () => import('@/views/panel/Page404') }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL || '/'),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    //  if (!store.getters.isLoggedIn) {
    // if (1 === 2) {
    //   next({ name: 'Login' })
    // } else {
      // if (!store.getters.isLoggedIn) {
      // next({ name: 'Login' })
      // } else {
      next() // go to wherever I'm going
      // }
    // }
  // }
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

router.afterEach((to, from, failure) => {
  // Any kind of navigation failure
  if (isNavigationFailure(failure)) {
    console.log(failure);
  }
  // Only duplicated navigations
  if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    console.log(failure);
  }
  // Aborted or canceled navigations
  if (isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.canceled)) {
    console.log(failure);
  }
})

export default router