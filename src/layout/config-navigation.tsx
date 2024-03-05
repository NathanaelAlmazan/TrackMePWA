import { ReactNode } from 'react';
import { SvgColor } from '../components';
import { Role } from '../__generated__/graphql';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export interface NavItem { 
    path: string, 
    icon: ReactNode,
    title: string,
    roles: Role[] | null
}

const navConfig: NavItem[] = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    roles: [Role.Director, Role.Superuser]
  },
  {
    title: 'calendar',
    path: '/calendar',
    icon: icon('ic_calendar'),
    roles: null
  },
  {
    title: 'documents',
    path: '/documents',
    icon: icon('ic_blog'),
    roles: null
  },
  {
    title: 'reports',
    path: '/reports',
    icon: icon('ic_reports'),
    roles: null
  },
  {
    title: 'settings',
    path: '/settings',
    icon: icon('ic_settings'),
    roles: [Role.Director, Role.Superuser]
  },
  {
    title: 'accounts',
    path: '/accounts',
    icon: icon('ic_user'),
    roles: [Role.Director, Role.Superuser]
  }
];

export default navConfig;