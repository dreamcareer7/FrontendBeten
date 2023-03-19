const permissions = JSON.parse(localStorage.getItem('permissions'))

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
    visible: permissions.includes('users.browse')
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-people',
    visible: permissions.includes('users.browse'),
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/clients',
    icon: 'cil-contact',
    visible: permissions.includes('clients.index'),
  },
  {
    component: 'CNavItem',
    name: 'Crew',
    to: '/crews',
    icon: 'cil-address-book',
    visible: permissions.includes('crew.index'),
  },
  {
    component: 'CNavTitle',
    name: 'Others',
  },
  {
    component: 'CNavGroup',
    name: 'Services',
    icon: 'cil-window',
    visible: permissions.includes('services.index'),
    items: [
      {
        component: 'CNavItem',
        name: 'Services',
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
    visible: permissions.includes('groups.index'),
  },
  {
    component: 'CNavItem',
    name: 'Vehicles',
    to: '/vehicles',
    icon: 'cil-car-alt',
    visible: permissions.includes('vehicles.index'),
  },
  {
    component: 'CNavItem',
    name: 'Dormitories',
    to: '/dormitories',
    icon: 'cil-door',
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
