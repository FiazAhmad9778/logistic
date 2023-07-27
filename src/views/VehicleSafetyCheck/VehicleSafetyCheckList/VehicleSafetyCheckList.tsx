import React, { useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useDialogState } from '@/hooks/useDialogState';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteSafetyCheckMutation,
  useSafetyCheckListQuery,
} from '@/infrastructure/store/api/safety-check/safety-check-api';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';
import { SafetyCheckResponse } from '@/infrastructure/store/api/safety-check/safety-check-types';

const VehicleSafetyCheckList = () => {
  const [safetyCheckId, setSafetyCheckId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: safetyCheckListing, isLoading: IsSafetyCheckLoading } = useSafetyCheckListQuery(null);
  const [deleteSafetyCheck, deleteSafetyCheckState] = useDeleteSafetyCheckMutation();
  const columnHelper = createColumnHelper<SafetyCheckResponse>();
  const columns = [
    columnHelper.accessor('checkName', {
      header: 'Name',
      size: 50,
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('fieldType', {
      header: 'Field Type',
      size: 20,
      cell: ({ getValue }) => <span>{`${getValue()}`}</span>,
    }),
    columnHelper.accessor('checkActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('checkDescription', {
      header: 'Vehicle Safety Check Description',
      size: 100,
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Safety Check List',
      size: 20,
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/vehicle-safety-check-list/edit-safety-check', {
                state: {
                  safetyCheckId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setSafetyCheckId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: safetyCheckListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteSafetyCheck = async () => {
    const res = await deleteSafetyCheck(safetyCheckId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Safety check deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };
  const loading = IsSafetyCheckLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Vehicle" show={isOpen} handleClose={setCloseDialog}>
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
              onClick={handleDeleteSafetyCheck}
              loading={deleteSafetyCheckState.isLoading}
              disabled={deleteSafetyCheckState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default VehicleSafetyCheckList;
