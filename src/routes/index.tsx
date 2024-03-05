import { lazy } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layout';
import { Loader } from '../components';

export const IndexPage = lazy(() => import('../sections/home'));
export const DashboardPage = lazy(() => import('../sections/dashboard'));
export const ReportsPage = lazy(() => import('../sections/reports'));
export const DocumentPage = lazy(() => import('../sections/documents'));
export const CalendarPage = lazy(() => import('../sections/calendar'));
export const LoginPage = lazy(() => import('../sections/auth/login'));
export const RegisterPage = lazy(() => import('../sections/auth/register'));
export const ResetPasswordPage = lazy(() => import('../sections/auth/password'));
export const AccountVerify = lazy(() => import('../sections/auth/verify'));
export const SettingsPage = lazy(() => import('../sections/settings'));
export const AccountsPage = lazy(() => import('../sections/accounts'));
export const Page404 = lazy(() => import('../sections/error'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Loader>
            <Outlet />
          </Loader>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'documents', element: <DocumentPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'reports', element: <ReportsPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'accounts', element: <AccountsPage /> }
      ],
    },
    {
      element: <Loader><IndexPage /></Loader>,
      index: true
    },
    {
      path: 'login',
      element: <Loader><LoginPage /></Loader>,
    },
    {
      path: 'register',
      element: <Loader><RegisterPage /></Loader>,
    },
    {
      path: 'password',
      element: <Loader><ResetPasswordPage /></Loader>,
    },
    {
      path: 'verify/:uuid',
      element: <Loader><AccountVerify /></Loader>,
    },
    {
      path: '404',
      element: <Loader><Page404 /></Loader>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}