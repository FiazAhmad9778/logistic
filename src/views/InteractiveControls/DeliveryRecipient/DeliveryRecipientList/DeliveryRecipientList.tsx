import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { useDialogState } from '@/hooks/useDialogState';
import {
  useDeleteDeliveryRecipientMutation,
  useDeliveryRecipientListQuery,
} from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-api';
import { DeliveryRecipientResponse } from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-types';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { isNull } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryRecipientList = () => {
  const [recipientId, setRecipientId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: deliveryRecipientListing, isLoading: IsDeliveryRecipientLoading } = useDeliveryRecipientListQuery(null);
  const [deleteDeliveryRecipient, deleteDeliveryRecipientState] = useDeleteDeliveryRecipientMutation();

  const columnHelper = createColumnHelper<DeliveryRecipientResponse>();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('createdDate', {
      header: 'Created At',
      cell: ({ getValue }) => <span>{!isNull(getValue()) ? getDateFormatMDY(getValue()) : 'N/A'}</span>,
    }),
    columnHelper.display({
      id: 'Delivery Recipient Listing',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/delivery-recipient-list/edit-delivery-recipient', {
                state: {
                  recipientId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setRecipientId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: deliveryRecipientListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteRoute = async () => {
    const res = await deleteDeliveryRecipient(recipientId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Delivery recipient deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsDeliveryRecipientLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Automated Email" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleDeleteRoute}
              loading={deleteDeliveryRecipientState.isLoading}
              disabled={deleteDeliveryRecipientState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default DeliveryRecipientList;
