import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import AddClientGroupDialog from '../AddClientGroupDialog/AddClientGroupDialog';
import ClientGroupListing from '../../../constant/data/client-groups-list.json';

const ClientGroupList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const [clientGroupDialog, setClientGroupDialog] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('ClientGroupName', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('IsActive', {
      header: 'Active',
      cell: ({ getValue }) => <span>{getValue() ? 'Yes' : 'No'}</span>,
    }),
    columnHelper.accessor('CreatedDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => setClientGroupDialog(true)}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: ClientGroupListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
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
            <Button btnType="btn-primary" btnSize="btn-sm" className="pd-x-25" type="button">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
      <AddClientGroupDialog isOpen={clientGroupDialog} setCloseDialog={() => setClientGroupDialog(false)} />
    </React.Fragment>
  );
};

export default ClientGroupList;
