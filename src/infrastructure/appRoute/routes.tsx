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
import ResetPassword from '@/views/Auth/ResetPassword';
import ForgotPassword from '@/views/Auth/ForgetPassword';
import UploadDriver from '@/views/DriverManagement/UploadDriver';
import RouteList from '@/views/RouteList';
import RouteAssignment from '@/views/RouteAssignment';
import AutoRouteAssignment from '@/views/AutoRouteAssignment';
import AddRoute from '@/views/RouteList/CreateRoute/AddRoute';
import AssignRoute from '@/views/RouteAssignment/AssignRoute/AssignRoute';
import AddAutoRoute from '@/views/AutoRouteAssignment/AddAutoRoute/AddAutoRoute';
import ClientManagement from '@/views/ClientManagement';
import AddClient from '@/views/ClientManagement/AddClient/AddClient';
import ClientGroupManagement from '@/views/ClientGroupManagement';
import VehicleSafetyCheck from '@/views/VehicleSafetyCheck';
import AddSafetyCheck from '@/views/VehicleSafetyCheck/AddSafetyCheck/AddSafetyCheck';

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
            path: 'user-privileges',
            title: 'User PRIVILEGES',
            element: <UserPrivileges />,
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
            path: 'drivers/bulk-upload-driver',
            title: 'UPLOAD DRIVER',
            element: <UploadDriver />,
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
            path: 'route-list',
            title: 'ROUTE LIST',
            element: <RouteList />,
          },
          {
            path: 'route-list/add-route',
            title: 'ADD ROUTE',
            element: <AddRoute />,
          },
          {
            path: 'route-assignment-list',
            title: 'ROUTE ASSIGNMENT LIST',
            element: <RouteAssignment />,
          },
          {
            path: 'route-assignment-list/assign-route',
            title: 'ROUTE ASSIGN',
            element: <AssignRoute />,
          },
          {
            path: 'auto-route-assignment-list',
            title: 'AUTO ROUTE ASSIGNMENT LIST',
            element: <AutoRouteAssignment />,
          },
          {
            path: 'auto-route-assignment-list/add-auto-route',
            title: 'ADD AUTO ROUTE',
            element: <AddAutoRoute />,
          },
          {
            path: 'vehicle-safety-check-list',
            title: 'VEHICLE SAFETY CHECK LIST',
            element: <VehicleSafetyCheck />,
          },
          {
            path: 'vehicle-safety-check-list/add-safety-check',
            title: 'ADD SAFETY CHECK',
            element: <AddSafetyCheck />,
          },
          {
            path: 'client-management',
            title: 'CLIENT MANAGEMENT',
            element: <ClientManagement />,
          },
          {
            path: 'client-management/add-client',
            title: 'ADD CLIENT',
            element: <AddClient />,
          },
          {
            path: 'client-group-management',
            title: 'CLIENT GROUP MANAGEMENT',
            element: <ClientGroupManagement />,
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
        title: 'AUTH',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            title: 'LOGIN',
            element: <Login />,
          },
          {
            path: 'reset-password',
            title: 'RESET',
            element: <ResetPassword />,
          },
          {
            path: 'forget-password',
            title: 'FORGOT',
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
];
