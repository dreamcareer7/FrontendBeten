import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/dashboard',
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
        path: '/users',
        name: 'Users',
        component: () => import('@/views/panel/User/Users'),
      },
      {
        path: '/users/create',
        name: 'Create user',
        component: () => import('@/views/panel/User/CreateUser'),
      },
      {
        path: '/users/edit/:id',
        name: 'Edit user',
        component: () => import('@/views/panel/User/UpdateUser'),
      },
      {
        path: '/clients',
        name: 'Clients',
        component: () => import('@/views/panel/Client/Clients'),
      },
      {
        path: '/clients/create',
        name: 'Create client',
        component: () => import('@/views/panel/Client/CreateClient'),
      },
      {
        path: '/clients/edit/:id',
        name: 'Update Client',
        component: () => import('@/views/panel/Client/UpdateClient'),
      },
      {
        path: '/crews',
        name: 'Crews',
        component: () => import('@/views/panel/Crew/Crews'),
      },
      {
        path: '/crews/create',
        name: 'Create crew',
        component: () => import('@/views/panel/Crew/CreateCrew'),
      },
      {
        path: '/crews/edit/:id',
        name: 'Update crew',
        component: () => import('@/views/panel/Crew/UpdateCrew'),
      },
      // Services menu
      {
        path: '/services',
        name: 'Services',
        component: () => import('@/views/panel/Service/Services/Services'),
      },
      {
        path: '/services/create',
        name: 'Create service',
        component: () => import('@/views/panel/Service/Services/CreateService'),
      },
      {
        path: '/services/:id',
        name: 'Update service',
        component: () => import('@/views/panel/Service/Services/UpdateService'),
      },
      {
        path: '/services/commits',
        name: 'Service Commits',
        component: () => import('@/views/panel/Service/Commits/Commits'),
      },
      // Service Commits
      {
        path: '/services/commits/:id',
        name: 'Service Commit details',
        component: () => import('@/views/panel/Service/Commits/CommitInfo'),
      },
      {
        path: '/services/commits/create',
        name: 'Create Commit',
        component: () => import('@/views/panel/Service/Commits/CreateCommit'),
      },
      {
        path: '/services/commits/edit/:id',
        name: 'Update Service Commit',
        component: () =>
          import('@/views/panel/Service/Commits/UpdateServiceCommit'),
      },
      // Service commits end

      // Phases Menu
      {
        path: '/phases',
        name: 'Phases',
        component: () => import('@/views/panel/Phase/Phases'),
      },
      {
        path: '/phases/create',
        name: 'Create Phase',
        component: () => import('@/views/panel/Phase/CreatePhase'),
      },
      {
        path: '/phases/update/:id',
        name: 'Update Phase',
        component: () => import('@/views/panel/Phase/UpdatePhase'),
      },
      // Phases Menu ends here

      // Meals Menu
      {
        path: '/meals',
        name: 'All Meals',
        component: () => import('@/views/panel/Meal/Meals/Meals'),
      },
      {
        path: '/meals/create',
        name: 'Create Meal',
        component: () => import('@/views/panel/Meal/Meals/CreateMeal'),
      },
      {
        path: '/meals/update/:id',
        name: 'Update Meal',
        component: () => import('@/views/panel/Meal/Meals/UpdateMeal'),
      },
      {
        path: '/meals/types',
        name: 'Types',
        component: () => import('@/views/panel/Meal/Types/Types'),
      },
      {
        path: '/meals/types/create',
        name: 'Create Type',
        component: () => import('@/views/panel/Meal/Types/CreateType'),
      },
      {
        path: '/meals/:id',
        name: 'Edit Meal Type',
        component: () => import('@/views/panel/Meal/Types/UpdateType'),
      },

      // Meals Menu ends here

      {
        path: '/groups',
        name: 'Groups',
        component: () => import('@/views/panel/Group/Groups'),
      },
      {
        path: '/groups/create',
        name: 'Create Group',
        component: () => import('@/views/panel/Group/CreateGroup'),
      },
      {
        path: '/groups/edit/:id',
        name: 'Update Group',
        component: () => import('@/views/panel/Group/UpdateGroup'),
      },
      {
        path: '/vehicles',
        name: 'vehicles',
        component: () => import('@/views/panel/Vehicle/Vehicles'),
      },
      {
        path: '/vehicles/create',
        name: 'create_vehicle',
        component: () => import('@/views/panel/Vehicle/CreateVehicle'),
      },
      {
        path: '/vehicles/update/:id',
        name: 'update_vehicle',
        component: () => import('@/views/panel/Vehicle/UpdateVehicle'),
      },
      {
        path: '/dormitories',
        name: 'Dormitories',
        component: () => import('@/views/panel/Dormitory/Dormitories'),
      },
      {
        path: '/dormitories/create',
        name: 'Create Dormitory',
        component: () => import('@/views/panel/Dormitory/CreateDormitory'),
      },
      {
        path: 'dormitories/update/:id',
        name: 'Update Dormitory',
        component: () => import('@/views/panel/Dormitory/UpdateDormitory'),
      },
      {
        path: '/concurrents',
        name: 'concurrents',
        component: () => import('@/views/panel/Concurrent/Concurrents'),
      },
      {
        path: '/concurrents/create',
        name: 'Create Concurrent',
        component: () => import('@/views/panel/Concurrent/CreateConcurrent'),
      },
      // Hospitalities Menu
      {
        path: '/hospitalities',
        name: 'Hospitalities',
        component: () =>
          import('@/views/panel/Hospitality/Hospitalities/Hospitalities'),
      },
      {
        path: '/hospitalities/create',
        name: 'Create a hospitality',
        component: () =>
          import('@/views/panel/Hospitality/Hospitalities/CreateHospitality'),
      },
      {
        path: '/hospitalities/update/:id',
        name: 'Update Hospitality',
        component: () =>
          import('@/views/panel/Hospitality/Hospitalities/UpdateHospitality'),
      },
      {
        path: '/hospitalities/transactions',
        name: 'Transactions',
        component: () =>
          import('@/views/panel/Hospitality/Transactions/Transactions'),
      },
      {
        path: '/hospitalities/transactions/create',
        name: 'Create Transaction',
        component: () =>
          import('@/views/panel/Hospitality/Transactions/CreateTransaction'),
      },
      // Hospitalities Menu ends here
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
  {
    path: '/',
    name: 'DefaultPage',
    component: () => import('@/views/home/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const auth_token = localStorage.getItem('auth_token')
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const defaultQuery = { path: '/', query: {} }

  if (to.matched.length > 0) {
    if (reqAuth && !auth_token) {
      next(defaultQuery)
    } else if (!reqAuth && auth_token) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (!auth_token) {
      next(defaultQuery)
    } else {
      next('/dashboard')
    }
  }
})

export default router
