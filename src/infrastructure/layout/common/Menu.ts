import {
  HomeIcon,
  UserIcon,
  UserPrivilegeIcon,
  ManageDriverIcon,
  OrderIcon,
  OrderStatusIcon,
  ProjectAndProfileIcon,
  RouteAssignmentIcon,
  VehicleSafetyCheckIcon,
  ClientManagementIcon,
  ClientGroupManagementIcon,
  RouteList,
  AutoRouteAssignmentIcon,
} from '@/components/Icon';

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
      },
      {
        path: `users`,
        icon: UserIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Company User',
      },
      {
        path: `user-privileges`,
        icon: UserPrivilegeIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'User Privileges',
      },

      {
        path: `drivers`,
        icon: ManageDriverIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Driver Management',
      },
      {
        path: `order-list`,
        icon: OrderIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Order Management',
      },
      {
        path: `order-status-list`,
        icon: OrderStatusIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Order Status',
      },
      {
        path: `profile-and-profile-list`,
        icon: ProjectAndProfileIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Profile Management',
      },
      {
        path: `route-list`,
        icon: RouteList,
        type: 'link',
        selected: false,
        active: false,
        title: 'Route List',
      },
      {
        path: `route-assignment-list`,
        icon: RouteAssignmentIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Route Assignment',
      },
      {
        path: `auto-route-assignment-list`,
        icon: AutoRouteAssignmentIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Auto Route Assignment',
      },
      {
        path: `vehicle-safety-check-list`,
        icon: VehicleSafetyCheckIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Vahicle Safety Check List',
      },
      {
        path: `client-management`,
        icon: ClientManagementIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Client Management',
      },
      {
        path: `client-group-management`,
        icon: ClientGroupManagementIcon,
        type: 'link',
        selected: false,
        active: false,
        title: 'Client Group Management',
      },
    ],
  },
];
