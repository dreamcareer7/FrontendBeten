import can from '@/plugins/gate'
import i18n from './plugins/i18n'

export default [
  {
    component: 'CNavItem',
    name: i18n.global.t('Dashboard'),
    to: '/dashboard',
    icon: 'cil-speedometer',
    visible: true,
  },
  {
    component: 'CNavTitle',
    name: i18n.global.t('User Management'),
    visible: can('users.browse'),
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Users'),
    to: '/users',
    icon: 'cil-people',
    visible: can('users.browse'),
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Clients'),
    to: '/clients',
    icon: 'cil-contact',
    visible: can('clients.index'),
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Crew'),
    to: '/crews',
    icon: 'cil-address-book',
    visible: can('crews.index'),
  },
  {
    component: 'CNavTitle',
    name: i18n.global.t('Others'),
  },
  {
    component: 'CNavGroup',
    name: i18n.global.t('Services'),
    icon: 'cil-window',
    visible: can('services.index'),
    items: [
      {
        component: 'CNavItem',
        name: i18n.global.t('Services'),
        to: '/services',
        visible: can('services.index'),
      },
      {
        component: 'CNavItem',
        name: i18n.global.t('Service Commits'),
        to: '/services/commits',
        visible: can('commits.index'),
      },
    ],
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Phases'),
    to: '/phases',
    icon: 'cil-media-step-forward',
    visible: can('phases.index'),
  },
  {
    component: 'CNavGroup',
    name: i18n.global.t('Meals'),
    to: '/meals',
    icon: 'cil-fastfood',
    visible: can('meals.index'),
    items: [
      {
        component: 'CNavItem',
        name: i18n.global.t('All meals'),
        to: '/meals',
        visible: can('meals.index'),
      },
      {
        component: 'CNavItem',
        name: i18n.global.t('Types'),
        to: '/meals/types',
        visible: can('types.index'),
      },
    ],
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Groups'),
    to: '/groups',
    icon: 'cil-wc',
    visible: can('groups.index'),
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Vehicles'),
    to: '/vehicles',
    icon: 'cil-car-alt',
    visible: can('vehicles.index'),
  },
  {
    component: 'CNavItem',
    name: i18n.global.t('Dormitories'),
    to: '/dormitories',
    icon: 'cil-door',
    visible: can('dormitories.index'),
  },
  {
    component: 'CNavGroup',
    name: i18n.global.t('Hospitalities'),
    to: '/hospitalities',
    icon: 'cil-mood-good',
    visible: can('hospitalities.index'),
    items: [
      {
        component: 'CNavItem',
        name: i18n.global.t('Hospitalities'),
        to: '/hospitalities',
        visible: can('hospitalities.index'),
      },
      {
        component: 'CNavItem',
        name: i18n.global.t('Transactions'),
        to: '/hospitalities/transactions',
        visible: can('transactions.index'),
      },
    ],
  },
]
