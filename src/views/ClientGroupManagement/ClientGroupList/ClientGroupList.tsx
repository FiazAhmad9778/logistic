import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import {
  useClientGroupsQuery,
  useDeleteClientGroupMutation,
} from '@/infrastructure/store/api/client-group/client-group-api';
import { ClientGroupResponse } from '@/infrastructure/store/api/client-group/client-group-types';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import IconButton from '@/components/Permission/action-icon';
import { ClaimCode } from 'src/enums/claim-codes';

const ClientGroupList = () => {
  const [clientGroupId, setClientGroupId] = useState<number>();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();
  const { data: clientGroupsListing, isLoading: IsClientGroupLoading } = useClientGroupsQuery(null);
  const [deleteClientGroup, deleteClientGroupState] = useDeleteClientGroupMutation();

  const columnHelper = createColumnHelper<ClientGroupResponse>();
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
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <IconButton
            requiredClaims={[ClaimCode.CGME]}
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/client-group-management/edit-client-group', {
                state: {
                  clientGroupId: info.row.original.id,
                },
              })
            }
          />
          <IconButton
            requiredClaims={[ClaimCode.CGMD]}
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setClientGroupId(info.row.original.id);
            }}
          />
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: clientGroupsListing?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteClientGroup = async () => {
    const res = await deleteClientGroup(clientGroupId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Client group deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsClientGroupLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Client Group" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleDeleteClientGroup}
              loading={deleteClientGroupState.isLoading}
              disabled={deleteClientGroupState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default ClientGroupList;
