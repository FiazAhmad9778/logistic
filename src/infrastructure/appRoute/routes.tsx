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
import AddOrder from '@/views/OrderManagement/AddOrder/AddOrder';
import EditOrder from '@/views/OrderManagement/EditOrder/EditOrder';
import EditSafetyCheck from '@/views/VehicleSafetyCheck/EditSafetyCheck/EditSafetyCheck';
import ViewOrder from '@/views/OrderManagement/ViewOrder/ViewOrder';
import AutomatedEmails from '@/views/InteractiveControls/AutomatedEmails';
import AddEmail from '@/views/InteractiveControls/AutomatedEmails/AddEmail/AddEmail';
import EditEmail from '@/views/InteractiveControls/AutomatedEmails/EditEmail/EditEmail';
import AddDeliveryRecipient from '@/views/InteractiveControls/DeliveryRecipient/AddDeliveryRecipient/AddDeliveryRecipient';
import EditDeliveryRecipient from '@/views/InteractiveControls/DeliveryRecipient/EditDeliveryRecipient/EditDeliveryRecipient';
import DeliveryRecipient from '@/views/InteractiveControls/DeliveryRecipient';
import TemperatureRange from '@/views/InteractiveControls/TemperatureRange';
import AddTemperature from '@/views/InteractiveControls/TemperatureRange/AddTemperature/AddTemperature';
import EditTemperature from '@/views/InteractiveControls/TemperatureRange/EditTemperature/EditTemperature';
import OrderRelatedQuestions from '@/views/InteractiveControls/OrderRelatedQuestions';
import AddQuestion from '@/views/InteractiveControls/OrderRelatedQuestions/AddQuestion/AddQuestion';
import EditQuestion from '@/views/InteractiveControls/OrderRelatedQuestions/EditQuestion/EditQuestion';
import MobileNotifications from '@/views/InteractiveControls/MobileNotifications';
import AddNotification from '@/views/InteractiveControls/MobileNotifications/AddNotification/AddNotification';
import EditNotification from '@/views/InteractiveControls/MobileNotifications/EditNotification/EditNotification';
import CustomerMailshot from '@/views/InteractiveControls/CustomerMailshot';
import AddCustomerMail from '@/views/InteractiveControls/CustomerMailshot/AddCustomerMail/AddCustomerMail';
import EditCustomerMail from '@/views/InteractiveControls/CustomerMailshot/EditCustomerMail/EditCustomerMail';
import CustomerSatisfactionSurvey from '@/views/InteractiveControls/CustomerSatisfactionSurvey';
import AddSurveyQuestion from '@/views/InteractiveControls/CustomerSatisfactionSurvey/AddSurveyQuestion/AddSurveyQuestion';
import EditSurveyQuestion from '@/views/InteractiveControls/CustomerSatisfactionSurvey/EditSurveyQuestion/EditSurveyQuestion';
import LateDeliveryReason from '@/views/InteractiveControls/LateDeliveryReason';
import AddReason from '@/views/InteractiveControls/LateDeliveryReason/AddReason/AddReason';
import EditReason from '@/views/InteractiveControls/LateDeliveryReason/EditReason/EditReason';
import EditCustomer from '@/views/CustomerManagement/EditCustomer/EditCustomer';
import Home from '@/views/Home';

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
            path: 'home',
            title: 'Home',
            element: <Home />,
            requiredClaims: [],
          },
          {
            path: 'dashboard',
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
            path: 'driver-management/view-safety-check',
            title: 'VIEW SAFETY CHECK',
            element: <ViewSafetyCheck />,
            requiredClaims: [],
          },
          {
            path: 'driver-management/bulk-upload-driver',
            title: 'UPLOAD DRIVER',
            element: <UploadDriver />,
            requiredClaims: [],
          },
          {
            path: 'order-management-list',
            title: 'ORDER MANAGEMENT LIST',
            element: <OrderManagement />,
            requiredClaims: [],
          },
          {
            path: 'order-management-list/add-order',
            title: 'ADD ORDER',
            element: <AddOrder />,
            requiredClaims: [],
          },
          {
            path: 'order-management-list/edit-order',
            title: 'EDIT ORDER',
            element: <EditOrder />,
            requiredClaims: [],
          },
          {
            path: 'order-management-list/view-order',
            title: 'VIEW ORDER',
            element: <ViewOrder />,
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
            path: 'vehicle-safety-check-list/edit-safety-check',
            title: 'EDIT SAFETY CHECK',
            element: <EditSafetyCheck />,
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
            path: 'customer-management/edit-customer',
            title: 'EDIT CUSTOMER',
            element: <EditCustomer />,
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
            path: 'automated-email-list',
            title: 'AUTOMATED EMAILS',
            element: <AutomatedEmails />,
            requiredClaims: [],
          },
          {
            path: 'automated-email-list/add-automated-email',
            title: 'ADD AUTOMATED EMAIL',
            element: <AddEmail />,
            requiredClaims: [],
          },
          {
            path: 'automated-email-list/edit-automated-email',
            title: 'EDIT AUTOMATED EMAIL',
            element: <EditEmail />,
            requiredClaims: [],
          },
          {
            path: 'delivery-recipient-list',
            title: 'DELIVERY RECIPIENT',
            element: <DeliveryRecipient />,
            requiredClaims: [],
          },
          {
            path: 'delivery-recipient-list/add-delivery-recipient',
            title: 'ADD DELIVERY RECIPIENT',
            element: <AddDeliveryRecipient />,
            requiredClaims: [],
          },
          {
            path: 'delivery-recipient-list/edit-delivery-recipient',
            title: 'EDIT DELIVERY RECIPIENT',
            element: <EditDeliveryRecipient />,
            requiredClaims: [],
          },
          {
            path: 'temperature-range-list',
            title: 'TEMPERATURE RANGE LIST',
            element: <TemperatureRange />,
            requiredClaims: [],
          },
          {
            path: 'temperature-range-list/add-temperature-range',
            title: 'ADD TEMPERATURE RANGE',
            element: <AddTemperature />,
            requiredClaims: [],
          },
          {
            path: 'temperature-range-list/edit-temperature-range',
            title: 'EDIT TEMPERATURE RANGE',
            element: <EditTemperature />,
            requiredClaims: [],
          },
          {
            path: 'order-related-questions-list',
            title: 'ORDER RELATED QUESTIONS LIST',
            element: <OrderRelatedQuestions />,
            requiredClaims: [],
          },
          {
            path: 'order-related-questions-list/add-question',
            title: 'ADD QUESTIONS LIST',
            element: <AddQuestion />,
            requiredClaims: [],
          },
          {
            path: 'order-related-questions-list/edit-question',
            title: 'EDIT QUESTIONS LIST',
            element: <EditQuestion />,
            requiredClaims: [],
          },
          {
            path: 'mobile-app-notification-list',
            title: 'MOBILE APP NOTIFICATION LIST',
            element: <MobileNotifications />,
            requiredClaims: [],
          },
          {
            path: 'mobile-app-notification-list/add-notification',
            title: 'ADD NOTIFICATION',
            element: <AddNotification />,
            requiredClaims: [],
          },
          {
            path: 'mobile-app-notification-list/edit-notification',
            title: 'EDIT NOTIFICATION',
            element: <EditNotification />,
            requiredClaims: [],
          },
          {
            path: 'customer-mailshot-list',
            title: 'CUSTOMER MAILSHOT LIST',
            element: <CustomerMailshot />,
            requiredClaims: [],
          },
          {
            path: 'customer-mailshot-list/add-customer-mail',
            title: 'ADD CUSTOMER MAIL',
            element: <AddCustomerMail />,
            requiredClaims: [],
          },
          {
            path: 'customer-mailshot-list/edit-customer-mail',
            title: 'EDIT CUSTOMER MAIL',
            element: <EditCustomerMail />,
            requiredClaims: [],
          },
          {
            path: 'customer-satisfaction-survey-questions-list',
            title: 'CUSTOMER SATISFACTION SURVEY QUESTIONS LIST',
            element: <CustomerSatisfactionSurvey />,
            requiredClaims: [],
          },
          {
            path: 'customer-satisfaction-survey-questions-list/add-survey-question',
            title: 'ADD SURVEY QUESTION',
            element: <AddSurveyQuestion />,
            requiredClaims: [],
          },
          {
            path: 'customer-satisfaction-survey-questions-list/edit-survey-question',
            title: 'EDIT SURVEY QUESTION',
            element: <EditSurveyQuestion />,
            requiredClaims: [],
          },
          {
            path: 'late-delivery-reason-list',
            title: 'LATE DELIVERY REASON LIST',
            element: <LateDeliveryReason />,
            requiredClaims: [],
          },
          {
            path: 'late-delivery-reason-list/add-reason',
            title: 'ADD REASON',
            element: <AddReason />,
            requiredClaims: [],
          },
          {
            path: 'late-delivery-reason-list/edit-reason',
            title: 'EDIT REASON',
            element: <EditReason />,
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
