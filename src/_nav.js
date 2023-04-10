import can from '@/plugins/gate'

const user = JSON.parse(localStorage.getItem('user'))

export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    visible: true,
  },
  {
    component: 'CNavTitle',
    name: 'User Management',
    visible: can('users.browse'),
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-people',
    visible: can('users.browse'),
  },
  
  /**
   * A nav group for Managing Clients
   * 
   * @author Manadinho (https://github.com/manadinho)
  */
  {
    component: 'CNavGroup',
    name: 'Manage Clients',
    icon: 'cil-window',
    visible: can('services.index'),
    items: [
      {
        component: 'CNavItem',
        name: 'Clients',
        to: '/clients',
        visible: can('clients.index'),
      },
      {
        component: 'CNavItem',
        name: 'Groups',
        to: '/groups',
        // if user is a supervisor of some group(s)...
        visible: can('groups.index') || user?.is_supervisor,
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Crew',
    to: '/crews',
    icon: 'cil-address-book',
    visible: can('crews.index'),
  },
  {
    component: 'CNavTitle',
    name: 'Others',
  },
  {
    component: 'CNavGroup',
    name: 'Services',
    icon: 'cil-window',
    visible: can('services.index'),
    items: [
      {
        component: 'CNavItem',
        name: 'Services',
        to: '/services',
        visible: can('services.index'),
      },
      {
        component: 'CNavItem',
        name: 'Service Commits',
        to: '/services/commits',
        visible: can('commits.index'),
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Phases',
    to: '/phases',
    icon: 'cil-media-step-forward',
    visible: can('phases.index'),
  },
  {
    component: 'CNavGroup',
    name: 'Meals',
    to: '/meals',
    icon: 'cil-fastfood',
    visible: can('meals.index'),
    items: [
      {
        component: 'CNavItem',
        name: 'All meals',
        to: '/meals',
        visible: can('meals.index'),
      },
      {
        component: 'CNavItem',
        name: 'Types',
        to: '/meals/types',
        visible: can('types.index'),
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Vehicles',
    to: '/vehicles',
    icon: 'cil-car-alt',
    visible: can('vehicles.index'),
  },
  {
    component: 'CNavItem',
    name: 'Dormitories',
    to: '/dormitories',
    icon: 'cil-door',
    visible: can('dormitories.index'),
  },
  {
    component: 'CNavGroup',
    name: 'Hospitalities',
    to: '/hospitalities',
    icon: 'cil-mood-good',
    visible: can('hospitalities.index'),
    items: [
      {
        component: 'CNavItem',
        name: 'Hospitalities',
        to: '/hospitalities',
        visible: can('hospitalities.index'),
      },
      {
        component: 'CNavItem',
        name: 'Transactions',
        to: '/hospitalities/transactions',
        visible: can('transactions.index'),
      },
    ],
  },
]
