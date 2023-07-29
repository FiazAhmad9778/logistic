import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import {
  useCustomerMailshotListQuery,
  useDeleteCustomerMailshotMutation,
} from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-api';
import { CustomerMailshotResponse } from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-types';

const CustomerMailshotList = () => {
  const [mailshotId, setMailshotId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: customerMailshotListing, isLoading: IsCustomerMailshotLoading } = useCustomerMailshotListQuery(null);
  const [deleteCustomerMailshot, deleteCustomerMailshotState] = useDeleteCustomerMailshotMutation();

  const columnHelper = createColumnHelper<CustomerMailshotResponse>();
  const columns = [
    columnHelper.accessor('subject', {
      header: 'subject',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('body', {
      header: 'Body',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('createdDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Customer Mailshot',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/customer-mailshot-list/edit-customer-mail', {
                state: {
                  mailshotId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setMailshotId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: customerMailshotListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCustomerMailshot = async () => {
    const res = await deleteCustomerMailshot(mailshotId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Customer mailshot deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsCustomerMailshotLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Customer Mailshot" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleCustomerMailshot}
              loading={deleteCustomerMailshotState.isLoading}
              disabled={deleteCustomerMailshotState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomerMailshotList;
