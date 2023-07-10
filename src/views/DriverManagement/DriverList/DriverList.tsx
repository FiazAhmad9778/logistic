import React, { useState } from 'react';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import MileageDialog from '../MileageDialog/MileageDialog';
import DriverListData from '../../../constant/data/drivers-list.json';

const DriverList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const [mileageDialog, setMileageDialog] = useState<boolean>(false);
  const navigate = useNavigate();
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
    columnHelper.accessor('ClientGroupName', {
      header: 'Group Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DriverId', {
      header: 'Driver Id',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Mobile', {
      header: 'Contact Date',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DriverOnlineStatus', {
      header: 'Online Status',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fas fa-eye me-1" onClick={() => navigate('/drivers/view-safety-check')}></i>
          <i className="fa fa-edit me-1" onClick={() => navigate('/drivers/create-driver')}></i>
          <i className="far fa-trash-alt me-1" onClick={setOpenDialog}></i>
          <i className="fa fa-location-arrow" onClick={() => setMileageDialog(true)}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: DriverListData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <Dialog title="Delete Driver" show={isOpen} handleClose={setCloseDialog}>
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
      <MileageDialog isOpen={mileageDialog} setCloseDialog={() => setMileageDialog(false)} />
    </React.Fragment>
  );
};

export default DriverList;
