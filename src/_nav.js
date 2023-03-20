import can from '@/plugins/gate'

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
    visible: can('users.browse')
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-people',
    visible: can('users.browse'),
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/clients',
    icon: 'cil-contact',
    visible: can('clients.index'),
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
        name: 'All Meals',
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
    name: 'Groups',
    to: '/groups',
    icon: 'cil-wc',
    visible: can('groups.index'),
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
    visible: can('vehicles.index'),
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
        name: 'All Hospitalities',
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
