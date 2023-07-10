import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import ClientListing from '../../../constant/data/clients-list.json';

const ClientManagementList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
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
      id: 'Create Order Instruction',
      header: () => <span>Actions</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: ClientListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
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
            <Button btnType="btn-primary" btnSize="btn-sm" className="pd-x-25" type="button">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default ClientManagementList;
