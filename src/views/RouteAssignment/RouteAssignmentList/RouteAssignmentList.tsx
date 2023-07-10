import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import RoutesAssignmentListing from '../../../constant/data/routes-assignment-list.json';

const RouteAssignmentList = () => {
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
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
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fas fa-eye me-1" onClick={() => navigate('/route-assignment-list/assigned-orders-list')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RoutesAssignmentListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
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
            <Button btnType="btn-primary" btnSize="btn-sm" className="pd-x-25" type="button">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default RouteAssignmentList;
