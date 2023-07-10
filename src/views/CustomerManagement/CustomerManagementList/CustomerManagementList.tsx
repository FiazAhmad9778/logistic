import React from 'react';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
import CustomerListing from '../../../constant/data/customer-list.json';

const CustomerManagementList = () => {
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('Name', {
      header: 'Customer Name',
      cell: (info) => (
        <span>
          {info.row.original.FirstName} {info.row.original.LastName}
        </span>
      ),
    }),
    columnHelper.accessor('CustomerId', {
      header: 'Customer ID',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Mobile', {
      header: 'Customer Contact Number',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Address', {
      header: 'Customer Address',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('CreatedOnUtc', {
      header: 'Created On',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/customer-management/add-customer')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: CustomerListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <Dialog title="Delete Customer" show={isOpen} handleClose={setCloseDialog}>
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

export default CustomerManagementList;
