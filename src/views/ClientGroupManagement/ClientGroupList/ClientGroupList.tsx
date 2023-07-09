import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';

const ClientGroupList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
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
          <i className="fa fa-edit me-1" onClick={setOpenDialog}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RouteAssignmentRecord,
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
    </React.Fragment>
  );
};

export default ClientGroupList;

const RouteAssignmentRecord = [
  {
    ClientGroupId: 21,
    ClientGroupName: 'BD Together',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164560573)/',
  },
  {
    ClientGroupId: 29,
    ClientGroupName: 'Caterlink',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1688534906107)/',
  },
  {
    ClientGroupId: 25,
    ClientGroupName: 'CH & Co G & G',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164609590)/',
  },
  {
    ClientGroupId: 20,
    ClientGroupName: 'CH & Co Kent',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164544780)/',
  },
  {
    ClientGroupId: 30,
    ClientGroupName: 'Compass East Sussex',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1688535995193)/',
  },
  {
    ClientGroupId: 23,
    ClientGroupName: 'Compass Wales',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164579993)/',
  },
  {
    ClientGroupId: 5,
    ClientGroupName: 'Dorset - Platebox',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1660219143177)/',
  },
  {
    ClientGroupId: 19,
    ClientGroupName: 'ESS Project',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1674564241907)/',
  },
  {
    ClientGroupId: 24,
    ClientGroupName: 'Harrison Bromley',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164593090)/',
  },
  {
    ClientGroupId: 26,
    ClientGroupName: 'Independent Bexley',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164624480)/',
  },
  {
    ClientGroupId: 27,
    ClientGroupName: 'Independent Welling',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164634353)/',
  },
  {
    ClientGroupId: 31,
    ClientGroupName: 'ISS Barnet',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1688536367890)/',
  },
  {
    ClientGroupId: 22,
    ClientGroupName: 'ISS Ealing',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1687164569590)/',
  },
  {
    ClientGroupId: 32,
    ClientGroupName: 'ISS Lambeth',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1688542013443)/',
  },
  {
    ClientGroupId: 17,
    ClientGroupName: 'Master',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1673623832327)/',
  },
  {
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1674207453850)/',
  },
  {
    ClientGroupId: 28,
    ClientGroupName: 'twelve 15',
    IsActive: true,
    IsDeleted: false,
    CreatedDate: '6/19/2023',
    UpdatedDate: '/Date(1688534890523)/',
  },
];
