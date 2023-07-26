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
  useAutomatedEmailListQuery,
  useDeleteAutomatedEmailMutation,
} from '@/infrastructure/store/api/automated-email/automated-email-api';
import { AutomatedEmailResponse } from '@/infrastructure/store/api/automated-email/automated-email-types';

const AutomatedEmailList = () => {
  const [emailId, setEmailId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: automatedEmailListing, isLoading: IsAutomatedEmailLoading } = useAutomatedEmailListQuery(null);
  const [deleteAutomatedEmail, deleteAutomatedEmailState] = useDeleteAutomatedEmailMutation();

  const columnHelper = createColumnHelper<AutomatedEmailResponse>();
  const columns = [
    columnHelper.accessor('email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('sectionName', {
      header: 'Section Name',
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
      id: 'Automated Email Listing',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/automated-email-list/edit-automated-email', {
                state: {
                  emailId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setEmailId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: automatedEmailListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteRoute = async () => {
    const res = await deleteAutomatedEmail(emailId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Automated email deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsAutomatedEmailLoading;
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
              loading={deleteAutomatedEmailState.isLoading}
              disabled={deleteAutomatedEmailState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AutomatedEmailList;
