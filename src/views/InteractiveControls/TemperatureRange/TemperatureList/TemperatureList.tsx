import Button from '@/components/Button';
import Loader from '@/components/Loader';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { useDialogState } from '@/hooks/useDialogState';
import {
  useDeleteTemperatureRangeMutation,
  useTemperatureRangeListQuery,
} from '@/infrastructure/store/api/temperature-range/temperature-range-api';
import { TemperatureRangeResponse } from '@/infrastructure/store/api/temperature-range/temperature-range-types';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { isNull } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemperatureList = () => {
  const [rangeId, setRangeId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: temperatureRangeListing, isLoading: IsTemperatureRangeLoading } = useTemperatureRangeListQuery(null);
  const [deleteTemperatureRange, deleteTemperatureRangeState] = useDeleteTemperatureRangeMutation();

  const columnHelper = createColumnHelper<TemperatureRangeResponse>();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('min', {
      header: 'Min',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('max', {
      header: 'Max',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('createdDate', {
      header: 'Created At',
      cell: ({ getValue }) => <span>{!isNull(getValue()) ? getDateFormatMDY(getValue()) : 'N/A'}</span>,
    }),
    columnHelper.display({
      id: 'Temperature Range',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/temperature-range-list/edit-temperature-range', {
                state: {
                  rangeId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setRangeId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: temperatureRangeListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteRoute = async () => {
    const res = await deleteTemperatureRange(rangeId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Temperature range deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsTemperatureRangeLoading;
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
              loading={deleteTemperatureRangeState.isLoading}
              disabled={deleteTemperatureRangeState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default TemperatureList;
