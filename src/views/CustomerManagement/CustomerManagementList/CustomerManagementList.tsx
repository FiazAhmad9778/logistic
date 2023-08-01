import React, { useState } from 'react';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { useCustomerListQuery, useDeleteCustomerMutation } from '@/infrastructure/store/api/customer/customer-api';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';
import { CustomerResponse } from '@/infrastructure/store/api/customer/customer-types';

const CustomerManagementList = () => {
  const [customerId, setCustomerId] = useState<number>();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();

  const { data: customerListing, isLoading: IsCustomerLoading } = useCustomerListQuery(null);
  const [deleteCustomer, deleteCustomerState] = useDeleteCustomerMutation();
  const columnHelper = createColumnHelper<CustomerResponse>();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Customer Name',
      cell: (info) => <span>{info.row.original.name}</span>,
    }),
    columnHelper.accessor('id', {
      header: 'Customer ID',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Customer Contact',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('address', {
      header: 'Customer Address',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('createdDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/customer-management/edit-customer', {
                state: {
                  customerId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setCustomerId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: customerListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteCustomer = async () => {
    const res = await deleteCustomer(customerId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Customer deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsCustomerLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
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
            <Button
              btnType="btn-primary"
              btnSize="btn-sm"
              className="pd-x-25"
              type="button"
              loaderSize={8}
              onClick={handleDeleteCustomer}
              loading={deleteCustomerState.isLoading}
              disabled={deleteCustomerState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomerManagementList;
