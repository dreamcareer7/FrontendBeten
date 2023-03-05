export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'User Management',
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-people',
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/clients',
    icon: 'cil-contact',
  },
  {
    component: 'CNavItem',
    name: 'Crew',
    to: '/crews',
    icon: 'cil-address-book',
  },
  {
    component: 'CNavTitle',
    name: 'Others',
  },
  {
    component: 'CNavGroup',
    name: 'Services',
    to: '/pages',
    icon: 'cil-window',
    items: [
      {
        component: 'CNavItem',
        name: 'All Services',
        to: '/services',
      },
      {
        component: 'CNavItem',
        name: 'Service Commits',
        to: '/services/commits',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Phases',
    to: '/phases',
    icon: 'cil-media-step-forward',
  },
  {
    component: 'CNavGroup',
    name: 'Meals',
    to: '/meals',
    icon: 'cil-fastfood',
    items: [
      {
        component: 'CNavItem',
        name: 'All Meals',
        to: '/meals',
      },
      {
        component: 'CNavItem',
        name: 'Types',
        to: '/meals/types',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Groups',
    to: '/groups',
    icon: 'cil-wc',
  },
  {
    component: 'CNavItem',
    name: 'Vehicle',
    to: '/vehicles',
    icon: 'cil-car-alt',
  },
  {
    component: 'CNavItem',
    name: 'Dormitories',
    to: '/dormitories',
    icon: 'cil-door',
  },
  {
    component: 'CNavItem',
    name: 'Concurrents',
    to: '/concurrents',
    icon: 'cil-contrast',
  },
  {
    component: 'CNavGroup',
    name: 'Hospitalities',
    to: '/hospitalities',
    icon: 'cil-mood-good',
    items: [
      {
        component: 'CNavItem',
        name: 'All Hospitalities',
        to: '/hospitalities',
      },
      {
        component: 'CNavItem',
        name: 'Transactions',
        to: '/hospitalities/transactions',
      },
    ],
  },
]
