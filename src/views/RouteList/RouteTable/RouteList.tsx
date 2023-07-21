import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { RowSelectionState, Updater, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteRouteMutation, useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { RouteResponse } from '@/infrastructure/store/api/route/route-types';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { setSelectedRouteIds } from '@/infrastructure/store/features/route/route-slice';
import TableCheckbox from '@/components/Table/TableCheckbox';

const RouteTable = () => {
  const [routeId, setRouteId] = useState<number>();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: routeListing, isLoading: IsRouteLoading } = useRouteListQuery(null);
  const [deleteClient, deleteRouteState] = useDeleteRouteMutation();
  const columnHelper = createColumnHelper<RouteResponse>();
  const columns = [
    columnHelper.display({
      id: 'id',
      size: 50,
      header: ({ table }) => (
        <span className="d-flex align-items-center gap-2">
          <TableCheckbox
            {...{
              checked: table?.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
          <span>Action</span>
        </span>
      ),
      cell: ({ row }) => (
        <span className="justify-content-center gap-2">
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </span>
      ),
    }),
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

  const handleOnChangeRouteRowIds = async (row: Updater<RowSelectionState>) => {
    await setSelected(row);
    const ids = useReactTableReturn.getSelectedRowModel();
    dispatch(setSelectedRouteIds(ids.rows.map((row) => row.original.id)));
  };

  const useReactTableReturn = useReactTable({
    data: routeListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selected,
    },
    onRowSelectionChange: (row) => handleOnChangeRouteRowIds(row),
    enableRowSelection: true,
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
