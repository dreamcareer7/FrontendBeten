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
    to: '/theme/colors',
    icon: 'cil-people',
  },
  {
    component: 'CNavItem',
    name: 'Clients',
    to: '/theme/typography',
    icon: 'cil-contact',
  },
  {
    component: 'CNavItem',
    name: 'Crew',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'Others',
  },
  {
    component: 'CNavItem',
    name: 'Contracts',
    to: '/theme/typography',
    icon: 'cil-pen-alt',
  },
  {
    component: 'CNavItem',
    name: 'Documents',
    to: '/theme/typography',
    icon: 'cil-file',
  },
  {
    component: 'CNavItem',
    name: 'Phases',
    to: '/theme/typography',
    icon: 'cil-room',
  },
  {
    component: 'CNavItem',
    name: 'Groups',
    to: '/theme/typography',
    icon: 'cil-wc',
  },
  {
    component: 'CNavItem',
    name: 'Vehicle',
    to: '/theme/typography',
    icon: 'cil-car-alt',
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
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Service Commits',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Service Commit Logs',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
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
