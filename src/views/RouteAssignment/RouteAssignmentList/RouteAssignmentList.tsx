import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import RoutesAssignmentListing from '../../../constant/data/routes-assignment-list.json';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';
import {
  useDeleteRouteAssignmentMutation,
  useRouteAssignmentListQuery,
} from '@/infrastructure/store/api/route-assignment/route-assignment';

const RouteAssignmentList = () => {
  const [routeAssignmentId, setRouteAssignmentId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: routeAssignmentListing, isLoading: IsRouteAssignmentLoading } = useRouteAssignmentListQuery(null);
  const [deleteClient, deleteRouteAssignmentState] = useDeleteRouteAssignmentMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('FirstName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientGroupName', {
      header: 'Client Group',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteStart', {
      header: 'Route Start',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteDate', {
      header: 'Route Date',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('AcceptByDriver', {
      header: 'Accepted',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('ProfileName', {
      header: 'Profile',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('CancelledByAdmin', {
      header: 'Cancelled',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('RouteStartTime', {
      header: 'Route Start Time',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteEndTime', {
      header: 'Route End Time',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fas fa-eye me-1" onClick={() => navigate('/route-assignment-list/assigned-orders-list')}></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setRouteAssignmentId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RoutesAssignmentListing || routeAssignmentListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleDeleteRouteAssignment = async () => {
    const res = await deleteClient(routeAssignmentId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Route assignment deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsRouteAssignmentLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Assigned Route" show={isOpen} handleClose={setCloseDialog}>
        <div>
          <p className="tx-14 tx-medium mg-b-20">Are you sure you want to delete this item?</p>
          <div className="d-flex justify-content-end">
            <Button
              btnType="btn-outline-danger"
              btnSize="btn-sm"
              className="pd-x-25 me-2"
              type="button"
              onClick={setCloseDialog}
            >
              Cancel
            </Button>
            <Button
              btnType="btn-primary"
              btnSize="btn-sm"
              className="pd-x-25"
              type="button"
              loaderSize={8}
              onClick={handleDeleteRouteAssignment}
              loading={deleteRouteAssignmentState.isLoading}
              disabled={deleteRouteAssignmentState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default RouteAssignmentList;
