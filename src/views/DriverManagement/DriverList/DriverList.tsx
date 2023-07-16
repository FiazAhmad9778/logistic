import React, { useState } from 'react';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import MileageDialog from '../MileageDialog/MileageDialog';
import { useDeleteDriverMutation, useDriversListQuery } from '@/infrastructure/store/api/driver/driver-api';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';
import { DriverResponse } from '@/infrastructure/store/api/driver/driver-types';

const DriverList = () => {
  const [driverId, setDriverId] = useState<number>();
  const [mileageDialog, setMileageDialog] = useState<boolean>(false);
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();

  const { data: driverListing, isLoading: IsDriverLoading } = useDriversListQuery(null);
  const [deleteDriver, deleteDriverState] = useDeleteDriverMutation();

  const columnHelper = createColumnHelper<DriverResponse>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'Driver Id',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fas fa-eye me-1" onClick={() => navigate('/drivers/view-safety-check')}></i>
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/driver-management/edit-driver', {
                state: {
                  driver: info.row.original,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setDriverId(info.row.original.id);
            }}
          ></i>
          <i className="fa fa-location-arrow" onClick={() => setMileageDialog(true)}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: driverListing?.data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteDriver = async () => {
    const res = await deleteDriver(driverId).unwrap();
    if (res.success === true) {
      HandleNotification(res.message || 'Driver deleted successfully.', res.success === true);
    } else {
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsDriverLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
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
            <Button
              btnType="btn-primary"
              btnSize="btn-sm"
              className="pd-x-25"
              type="button"
              loaderSize={8}
              onClick={handleDeleteDriver}
              loading={deleteDriverState.isLoading}
              disabled={deleteDriverState.isLoading}
            >
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
