import React from 'react';
import Layout from '@/infrastructure/layout/Layout';
import Login from '@/views/Auth/Login';
import Dashboard from '@/views/Dashboard';
import NotFound from '@/views/ErrorPage/NotFound';
import DriverManagement from '@/views/DriverManagement';
import AddDriver from '@/views/DriverManagement/AddDriver/AddDriver';
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
import AddRoute from '@/views/RouteList/AddRoute/AddRoute';
import AssignRoute from '@/views/RouteAssignment/AssignRoute/AssignRoute';
import AddAutoRoute from '@/views/AutoRouteAssignment/AddAutoRoute/AddAutoRoute';
import ClientManagement from '@/views/ClientManagement';
import AddClient from '@/views/ClientManagement/AddClient/AddClient';
import ClientGroupManagement from '@/views/ClientGroupManagement';
import VehicleSafetyCheck from '@/views/VehicleSafetyCheck';
import AddSafetyCheck from '@/views/VehicleSafetyCheck/AddSafetyCheck/AddSafetyCheck';
import CustomerManagement from '@/views/CustomerManagement';
import AddCustomer from '@/views/CustomerManagement/AddCustomer/AddCustomer';
import CustomerReviewRating from '@/views/CustomerReviewRating';
import ViewSafetyCheck from '@/views/DriverManagement/ViewSafetyCheck/ViewSafetyCheck';
import ViewOrderStatus from '@/views/OrderStatusManagement/ViewOrderStatus/ViewOrderStatus';
import AssignedOrdersList from '@/views/RouteAssignment/AssignedOrdersList/AssignedOrdersList';
import DriverRouteReview from '@/views/CustomerReviewRating/DriverRouteReview/DriverRouteReview';
import AddClientGroup from '@/views/ClientGroupManagement/AddClientGroup/AddClientGroup';
import EditClientGroup from '@/views/ClientGroupManagement/EditClientGroup/EditClientGroup';
import EditClient from '@/views/ClientManagement/EditClient/EditClient';
import { ClaimCode } from 'src/enums/claim-codes';
import EditDriver from '@/views/DriverManagement/EditDriver/EditDriver';
import AddUser from '@/views/Company/AddUser/AddUser';
import CompanyUsers from '@/views/Company';
import EditUser from '@/views/Company/EditUser/EditUser';
import EditRoute from '@/views/RouteList/EditRoute/EditRoute';

export interface RoutePathDefinition {
  title?: string;
  nav?: boolean;
  children?: RoutePathDefinition[];
  path: string;
  element?: React.ReactNode | null;
  requiredClaims?: string[];
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
            requiredClaims: [],
          },
          {
            path: 'user-privileges',
            title: 'User PRIVILEGES',
            element: <UserPrivileges />,
            requiredClaims: [ClaimCode.UPA, ClaimCode.UPD, ClaimCode.UPE, ClaimCode.UPV],
          },
          {
            path: 'company-users',
            title: 'USER LIST',
            element: <CompanyUsers />,
            requiredClaims: [ClaimCode.UMA, ClaimCode.UMD, ClaimCode.UME, ClaimCode.UMV],
          },
          {
            path: 'company-users/add-user',
            title: 'ADD USER',
            element: <AddUser />,
            requiredClaims: [ClaimCode.UMA],
          },
          {
            path: 'company-users/edit-user',
            title: 'EDIT USER',
            element: <EditUser />,
            requiredClaims: [ClaimCode.UME],
          },
          {
            path: 'driver-management',
            title: 'DRIVER MANAGEMENT',
            element: <DriverManagement />,
            requiredClaims: [ClaimCode.DMA, ClaimCode.DMD, ClaimCode.DME, ClaimCode.DMV],
          },
          {
            path: 'driver-management/add-driver',
            title: 'ADD DRIVER',
            element: <AddDriver />,
            requiredClaims: [ClaimCode.DMA],
          },
          {
            path: 'driver-management/edit-driver',
            title: 'EDIT DRIVER',
            element: <EditDriver />,
            requiredClaims: [ClaimCode.DME],
          },
          {
            path: 'drivers/view-safety-check',
            title: 'VIEW SAFETY CHECK',
            element: <ViewSafetyCheck />,
            requiredClaims: [],
          },
          {
            path: 'drivers/bulk-upload-driver',
            title: 'UPLOAD DRIVER',
            element: <UploadDriver />,
            requiredClaims: [],
          },
          {
            path: 'order-list',
            title: 'ORDER LIST',
            element: <OrderManagement />,
            requiredClaims: [],
          },
          {
            path: 'order-status-management',
            title: 'ORDER STATUS MANAGEMENT',
            element: <OrderStatusManagement />,
            requiredClaims: [],
          },
          {
            path: 'order-status-management/view-order-status',
            title: 'ORDER STATUS MANAGEMENT',
            element: <ViewOrderStatus />,
            requiredClaims: [],
          },
          {
            path: 'route-list',
            title: 'ROUTE LIST',
            element: <RouteList />,
            requiredClaims: [],
          },
          {
            path: 'route-list/add-route',
            title: 'ADD ROUTE',
            element: <AddRoute />,
            requiredClaims: [],
          },
          {
            path: 'route-list/edit-route',
            title: 'EDIT ROUTE',
            element: <EditRoute />,
            requiredClaims: [],
          },
          {
            path: 'route-assignment-list',
            title: 'ROUTE ASSIGNMENT LIST',
            element: <RouteAssignment />,
            requiredClaims: [],
          },
          {
            path: 'route-assignment-list/assigned-orders-list',
            title: 'ROUTE ASSIGNMENT LIST',
            element: <AssignedOrdersList />,
            requiredClaims: [],
          },
          {
            path: 'route-assignment-list/assign-route',
            title: 'ROUTE ASSIGN',
            element: <AssignRoute />,
            requiredClaims: [],
          },
          {
            path: 'auto-route-assignment-list',
            title: 'AUTO ROUTE ASSIGNMENT LIST',
            element: <AutoRouteAssignment />,
            requiredClaims: [],
          },
          {
            path: 'auto-route-assignment-list/add-auto-route',
            title: 'ADD AUTO ROUTE',
            element: <AddAutoRoute />,
            requiredClaims: [],
          },
          {
            path: 'vehicle-safety-check-list',
            title: 'VEHICLE SAFETY CHECK LIST',
            element: <VehicleSafetyCheck />,
            requiredClaims: [],
          },
          {
            path: 'vehicle-safety-check-list/add-safety-check',
            title: 'ADD SAFETY CHECK',
            element: <AddSafetyCheck />,
            requiredClaims: [],
          },
          {
            path: 'client-management',
            title: 'CLIENT MANAGEMENT',
            element: <ClientManagement />,
            requiredClaims: [ClaimCode.CliMgA, ClaimCode.CliMgD, ClaimCode.CliMgE, ClaimCode.CliMgV],
          },
          {
            path: 'client-management/add-client',
            title: 'ADD CLIENT',
            element: <AddClient />,
            requiredClaims: [ClaimCode.CliMgA],
          },
          {
            path: 'client-management/edit-client',
            title: 'EDIT CLIENT',
            element: <EditClient />,
            requiredClaims: [ClaimCode.CliMgE],
          },
          {
            path: 'client-group-management',
            title: 'CLIENT GROUP MANAGEMENT',
            element: <ClientGroupManagement />,
            requiredClaims: [ClaimCode.CGMA, ClaimCode.CGMD, ClaimCode.CGME, ClaimCode.CGMV],
          },
          {
            path: 'client-group-management/add-client-group',
            title: 'ADD CLIENT GROUP',
            element: <AddClientGroup />,
            requiredClaims: [ClaimCode.CGME],
          },
          {
            path: 'client-group-management/edit-client-group',
            title: 'ADD CLIENT GROUP',
            element: <EditClientGroup />,
            requiredClaims: [ClaimCode.CGMA],
          },
          {
            path: 'customer-management',
            title: 'CUSTOMER MANAGEMENT',
            element: <CustomerManagement />,
            requiredClaims: [],
          },
          {
            path: 'customer-management/add-customer',
            title: 'ADD CUSTOMER',
            element: <AddCustomer />,
            requiredClaims: [],
          },
          {
            path: 'customer-review-and-rating',
            title: 'CUSTOMER REVIEW AND RATING',
            element: <CustomerReviewRating />,
            requiredClaims: [],
          },
          {
            path: 'customer-review-and-rating/driver-route-review',
            title: 'DRIVER ROUTE REVIEW',
            element: <DriverRouteReview />,
            requiredClaims: [],
          },
          {
            path: '*',
            title: 'NOT_FOUND',
            element: <NotFound />,
            requiredClaims: [],
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
            requiredClaims: [],
          },
          {
            path: 'reset-password',
            title: 'RESET',
            element: <ResetPassword />,
            requiredClaims: [],
          },
          {
            path: 'forget-password',
            title: 'FORGOT',
            element: <ForgotPassword />,
            requiredClaims: [],
          },
        ],
      },
    ],
    requiredClaims: [],
  },
];
