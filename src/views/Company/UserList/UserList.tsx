import React, { useState } from 'react';
import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';
import UserData from '../../../constant/data/company-user.json';
import { useDeleteUserMutation, useUsersListQuery } from '@/infrastructure/store/api/company/company-api';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';

const UserList = () => {
  const [userId, setUserId] = useState<number>();

  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();

  const { data: userListing, isLoading: IsUserListLoading } = useUsersListQuery(null);
  const [deleteUser, deleteUserState] = useDeleteUserMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('user', {
      header: 'Name',
      cell: (info) => (
        <span>
          {info.row.original.FirstName} {info.row.original.LastName}
        </span>
      ),
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('UserType', {
      header: 'User Type',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('PhoneNumber', {
      header: 'Phone Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('AddDate', {
      header: 'Add Date',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/company-users/edit-user/')}></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setUserId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: UserData || userListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteUser = async () => {
    const res = await deleteUser(userId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'User deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsUserListLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete User" show={isOpen} handleClose={setCloseDialog}>
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
              type="button"
              btnType="btn-primary"
              btnSize="btn-sm"
              className="pd-x-25"
              loaderSize={8}
              onClick={handleDeleteUser}
              loading={deleteUserState.isLoading}
              disabled={deleteUserState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default UserList;
