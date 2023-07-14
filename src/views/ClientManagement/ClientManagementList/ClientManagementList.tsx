import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useClientListQuery, useDeleteClientMutation } from '@/infrastructure/store/api/client/client-api';
import { HandleNotification } from '@/components/Toast';
import { useNavigate } from 'react-router-dom';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import IconButton from '@/components/Permission/action-icon';
import { ClaimCode } from 'src/enums/claim-codes';

const ClientManagementList = () => {
  const [clientId, setClientId] = useState<number>();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();

  const { data: clientListing, isLoading: IsClientLoading } = useClientListQuery(null);
  const [deleteClient, deleteClientState] = useDeleteClientMutation();
  const columnHelper = createColumnHelper<ClientResponse>();
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
      header: 'Date Created',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Client Listing',
      header: () => <span>Actions</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <IconButton
            requiredClaims={[ClaimCode.CliMgE]}
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/client-management/edit-client', {
                state: {
                  client: info.row.original,
                },
              })
            }
          />
          <IconButton
            requiredClaims={[ClaimCode.CliMgD]}
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setClientId(info.row.original.id);
            }}
          />
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
