import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import AutoRoutesListing from '../../../constant/data/auto-routes-list.json';

const AutoRouteAssignmentList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('DriverName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientGroupName', {
      header: 'Group Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('MatchingProfileName', {
      header: 'Matching Profile Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('AutoAssignStartDate', {
      header: 'Assign From',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('AutoAssignStartDate', {
      header: 'Assign Till',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: AutoRoutesListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <Dialog title="Delete Auto Route" show={isOpen} handleClose={setCloseDialog}>
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

export default AutoRouteAssignmentList;
