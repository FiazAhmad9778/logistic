import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useClientListQuery, useDeleteClientMutation } from '@/infrastructure/store/api/client/client-api';
import { HandleNotification } from '@/components/Toast';

const ClientManagementList = () => {
  const [clientId, setClientId] = useState<number>();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const { data: clientListing, isLoading: IsClientLoading } = useClientListQuery(null);
  const [deleteClient, deleteClientState] = useDeleteClientMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('ClientName', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('PersonOfContactName', {
      header: 'Contact Person',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientEmail', {
      header: 'Contact Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientMobile', {
      header: 'Contact Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('CreatedOnUtc', {
      header: 'Date Created',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('MatchingProfileText', {
      header: 'Matching Profile Text',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Client Listing',
      header: () => <span>Actions</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setClientId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: clientListing?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteClient = async () => {
    const res = await deleteClient(clientId).unwrap();
    if (res.success === true) {
      HandleNotification(res.message || 'Client deleted successfully.', res.success === true);
    } else {
      HandleNotification(res?.errors[0], res.success === true);
    }
  };
  const loading = IsClientLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Client" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleDeleteClient}
              loading={deleteClientState.isLoading}
              disabled={deleteClientState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default ClientManagementList;
