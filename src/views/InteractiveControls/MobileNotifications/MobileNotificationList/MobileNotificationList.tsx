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
  useDeleteMobileNotificationMutation,
  useMobileNotificationListQuery,
} from '@/infrastructure/store/api/mobile-notification/mobile-notification-api';
import { MobileNotificationResponse } from '@/infrastructure/store/api/mobile-notification/mobile-notification-types';

const MobileNotificationList = () => {
  const [notificationId, setNotificationId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: notificationListing, isLoading: IsNotificationLoading } = useMobileNotificationListQuery(null);
  const [deleteNotification, deleteNotificationState] = useDeleteMobileNotificationMutation();

  const columnHelper = createColumnHelper<MobileNotificationResponse>();
  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('message', {
      header: 'Message',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('createdDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Mobile Notification List',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/mobile-app-notification-list/edit-notification', {
                state: {
                  notificationId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setNotificationId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: notificationListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNotification = async () => {
    const res = await deleteNotification(notificationId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Notification deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsNotificationLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Notification" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleNotification}
              loading={deleteNotificationState.isLoading}
              disabled={deleteNotificationState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default MobileNotificationList;
