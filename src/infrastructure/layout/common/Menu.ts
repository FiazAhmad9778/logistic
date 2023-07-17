import {
  HomeIcon,
  UserIcon,
  UserPrivilegeIcon,
  ManageDriverIcon,
  OrderIcon,
  OrderStatusIcon,
  RouteAssignmentIcon,
  VehicleSafetyCheckIcon,
  ClientManagementIcon,
  ClientGroupManagementIcon,
  RouteList,
  AutoRouteAssignmentIcon,
  CustomerManagement,
  CustomerReviewIcon,
} from '@/components/Icon';
import { ClaimCode } from 'src/enums/claim-codes';

export const MENUITEMS = [
  {
    Items: [
      {
        path: ``,
        icon: HomeIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Dashboard',
        requiredClaims: [],
      },

      {
        path: `client-group-management`,
        icon: ClientGroupManagementIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Client Group Management',
        requiredClaims: [ClaimCode.CGMA, ClaimCode.CGMD, ClaimCode.CGME, ClaimCode.CGMV],
      },
      {
        path: `client-management`,
        icon: ClientManagementIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Client Management',
        requiredClaims: [ClaimCode.CliMgA, ClaimCode.CliMgD, ClaimCode.CliMgE, ClaimCode.CliMgV],
      },
      {
        path: `user-privileges`,
        icon: UserPrivilegeIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'User Privileges',
        requiredClaims: [ClaimCode.UPA, ClaimCode.UPD, ClaimCode.UPE, ClaimCode.UPV],
      },
      {
        path: `driver-management`,
        icon: ManageDriverIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Driver Management',
        requiredClaims: [ClaimCode.DMA, ClaimCode.DMD, ClaimCode.DME, ClaimCode.DMV],
      },
      {
        path: `company-users`,
        icon: UserIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Company User',
        requiredClaims: [ClaimCode.UMA, ClaimCode.UMD, ClaimCode.UME, ClaimCode.UMV],
      },
      {
        path: `order-list`,
        icon: OrderIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Order Management',
        requiredClaims: [ClaimCode.OME, ClaimCode.OMV],
      },
      {
        path: `order-status-management`,
        icon: OrderStatusIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Order Status Management',
        requiredClaims: [ClaimCode.OSMV],
      },
      // {
      //   path: `profile-and-profile-list`,
      //   icon: ProjectAndProfileIcon,
      //   type: 'link',
      //   selected: false,
      //   active: false,
      //   title: 'Profile Management',
      // },
      {
        path: `route-list`,
        icon: RouteList,
        type: 'link',
        selected: false,
        active: false,
        title: 'Route List',
        requiredClaims: [ClaimCode.RMA, ClaimCode.RMD, ClaimCode.RME, ClaimCode.RMV],
      },
      {
        path: `route-assignment-list`,
        icon: RouteAssignmentIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Route Assignment',
        requiredClaims: [ClaimCode.RAMA, ClaimCode.RAMC, ClaimCode.RAMV],
      },
      {
        path: `auto-route-assignment-list`,
        icon: AutoRouteAssignmentIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Auto Route Assignment',
        requiredClaims: [ClaimCode.ARAA, ClaimCode.ARAD],
      },
      {
        path: `vehicle-safety-check-list`,
        icon: VehicleSafetyCheckIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Vehicle Safety Check List',
        requiredClaims: [ClaimCode.VSCA, ClaimCode.VSCD, ClaimCode.VSCE, ClaimCode.VSCV],
      },
      {
        path: `customer-management`,
        icon: CustomerManagement,
        type: 'link',
        selected: false,
        active: false,
        title: 'Customer Management',
        requiredClaims: [ClaimCode.CMA, ClaimCode.CMD, ClaimCode.CME, ClaimCode.CMV],
      },
      {
        path: `customer-review-and-rating`,
        icon: CustomerReviewIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Customer Review and Rating',
        requiredClaims: [ClaimCode.CRV],
      },
    ],
  },
];
