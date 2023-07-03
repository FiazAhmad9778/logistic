import React from 'react';
import Layout from '@/infrastructure/layout/Layout';
import Login from '@/views/Auth/Login';
import UserList from '@/views/Company/UserList';
import Dashboard from '@/views/Dashboard';
import NotFound from '@/views/ErrorPage/NotFound';
import CreateUser from '@/views/Company/CreateUser';
import DriverManagement from '@/views/DriverManagement';
import AddDriver from '@/views/DriverManagement/CreateUpdateDriver/AddDriver';
import OrderManagement from '@/views/OrderManagement';
import OrderStatusManagement from '@/views/OrderStatusManagement';
import UserPrivileges from '@/views/UserPrivileges';
import AuthLayout from '../layout/AuthLayout';

export interface RoutePathDefinition {
  title?: string;
  nav?: boolean;
  children?: RoutePathDefinition[];
  path: string;
  element?: React.ReactNode | null;
}

export const routes: RoutePathDefinition[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        title: 'HOME',
        element: <Layout />,
        children: [
          {
            path: '',
            title: 'Dashboard',
            element: <Dashboard />,
          },
          {
            path: 'users',
            title: 'USER LIST',
            element: <UserList />,
          },
          {
            path: 'users/create-user',
            title: 'CREATE USER',
            element: <CreateUser />,
          },
          {
            path: 'drivers',
            title: 'DRIVER LIST',
            element: <DriverManagement />,
          },
          {
            path: 'drivers/create-driver',
            title: 'CREATE DRIVER',
            element: <AddDriver />,
          },
          {
            path: 'order-list',
            title: 'ORDER LIST',
            element: <OrderManagement />,
          },
          {
            path: 'order-status-list',
            title: 'ORDER LIST',
            element: <OrderStatusManagement />,
          },
          {
            path: 'user-privileges',
            title: 'USER PRIVILEGES',
            element: <UserPrivileges />,
          },
          {
            path: '*',
            title: 'NOT_FOUND',
            element: <NotFound />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            title: 'AUTH',
            element: <Login />,
          },
        ],
      },
    ],
  },
];
