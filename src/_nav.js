export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW',
    // },
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
    component: 'CNavItem',
    name: 'Contracts',
    to: '/contracts',
    icon: 'cil-pen-alt',
  },
  {
    component: 'CNavItem',
    name: 'Documents',
    to: '/documents',
    icon: 'cil-file',
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
      {
        component: 'CNavItem',
        name: 'Service Commit Logs',
        to: '/services/logs',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Phases',
    to: '/phases',
    icon: 'cil-media-step-forward',
    items: [
      {
        component: 'CNavItem',
        name: 'All Phases',
        to: '/phases',
      },
      {
        component: 'CNavItem',
        name: 'Services',
        to: '/phases/services',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Meals',
    to: '/meals',
    icon: 'cil-fastfood',
    items: [
      {
        component: 'CNavItem',
        name: 'All meals',
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

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
