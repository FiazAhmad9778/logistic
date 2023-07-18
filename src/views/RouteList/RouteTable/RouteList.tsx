import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteRouteMutation, useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';

const RouteTable = () => {
  const [routeId, setRouteId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: routeListing, isLoading: IsRouteLoading } = useRouteListQuery(null);
  const [deleteClient, deleteRouteState] = useDeleteRouteMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('routeName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('routeStart', {
      header: 'Route Start',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('routeEnd', {
      header: 'Route Start',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('routeDate', {
      header: 'Route Date',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/route-list/edit-route', {
                state: {
                  routeId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setRouteId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: routeListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleDeleteRoute = async () => {
    const res = await deleteClient(routeId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Route deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsRouteLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Route" show={isOpen} handleClose={setCloseDialog}>
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
              loading={deleteRouteState.isLoading}
              disabled={deleteRouteState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default RouteTable;
