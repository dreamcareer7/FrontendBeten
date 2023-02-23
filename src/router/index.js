import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

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
        name: 'Create user',
        component: () => import('@/views/panel/User/CreateUser'),
      },
      {
        path: 'users/edit/:id',
        name: 'Edit user',
        component: () => import('@/views/panel/User/UpdateUser'),
      },
      {
        path: 'users/info/:id',
        name: 'User Details',
        component: () => import('@/views/panel/User/UserInfo'),
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/panel/Client/Clients'),
      },
      {
        path: 'clients/create',
        name: 'Create client',
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
      {
        path: 'documents/view/:id',
        name: 'View Document',
        component: () => import('@/views/panel/Document/viewDocument'),
      },
      {
        path: 'documents/update/:id',
        name: 'update_document',
        component: () => import('@/views/panel/Document/UpdateDocument'),
      },
      // Services menu
      {
        path: 'services',
        name: 'Services',
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
        path: 'services/commits/:id',
        name: 'service_commit_info',
        component: () => import('@/views/panel/Service/Commits/CommitInfo'),
      },
      {
        path: 'services/commits/create',
        name: 'Create Commit',
        component: () => import('@/views/panel/Service/Commits/CreateCommit'),
      },
      {
        path: 'services/commits/edit/:id',
        name: 'Update Service Commit',
        component: () =>
          import('@/views/panel/Service/Commits/UpdateServiceCommit'),
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
        path: 'phases/update/:id',
        name: 'update_phase',
        component: () => import('@/views/panel/Phase/Phases/UpdatePhase'),
      },
      {
        path: 'phases/info/:id',
        name: 'phase_info',
        component: () => import('@/views/panel/Phase/Phases/PhaseInfo'),
      },
      {
        path: 'phases/services',
        name: 'Phases Services',
        component: () => import('@/views/panel/Phase/Services/Services'),
      },
      {
        path: 'phases/services/create',
        name: 'Create Phase Service',
        component: () => import('@/views/panel/Phase/Services/CreateService'),
      },

      // Phases Menu ends here

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
        component: () => import('@/views/panel/Dormitory/Dormitories'),
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
        component: () =>
          import('@/views/panel/Hospitality/Hospitalities/Hospitalities'),
      },
      {
        path: 'hospitalities/create',
        name: 'Create Concurrent',
        component: () =>
          import('@/views/panel/Hospitality/Hospitalities/CreateHospitality'),
      },
      {
        path: 'hospitalities/transactions',
        name: 'Transactions',
        component: () =>
          import('@/views/panel/Hospitality/Transactions/Transactions'),
      },
      {
        path: 'hospitalities/transactions/create',
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
