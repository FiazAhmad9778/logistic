import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useDialogState } from '@/hooks/useDialogState';
import { useNavigate } from 'react-router-dom';
import VehicleSafetyCheckListing from '../../../constant/data/vehicle-safety-check-list.json';

const VehicleSafetyCheckList = () => {
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('CheckName', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('checkDescription', {
      header: 'Vehicle Safety Check Description',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('checkActive', {
      header: 'Status',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Active' : ''}</span>
      ),
    }),
    columnHelper.accessor('DefaultValue', {
      header: 'Default Value',
      cell: ({ getValue }) => <span>{`${getValue()}`}</span>,
    }),
    columnHelper.accessor('IsMajorFault', {
      header: 'Major Fault',
      cell: ({ getValue }) => <span>{getValue() ? 'Not a Major Fault' : 'Major Fault'}</span>,
    }),
    columnHelper.accessor('createOn', {
      header: 'Create On',
      cell: ({ getValue }) => <span>{getValue() || '15/2/2021'}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/vehicle-safety-check-list/add-safety-check')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: VehicleSafetyCheckListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <Dialog title="Delete Vehicle" show={isOpen} handleClose={setCloseDialog}>
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
export default VehicleSafetyCheckList;
