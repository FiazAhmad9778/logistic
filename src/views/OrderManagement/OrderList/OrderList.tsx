import Table from '@/components/Table';
import { RowSelectionState, Updater, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import OrderListData from '../../../constant/data/orders-list.json';
import { useOrderListQuery } from '@/infrastructure/store/api/order/order-api';
import Loader from '@/components/Loader';
import { useNavigate } from 'react-router-dom';
import TableCheckbox from '@/components/Table/TableCheckbox';
import { setSelectedOrderIds } from '@/infrastructure/store/features/order/order-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';

const OrderList = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: orderListing, isLoading: IsOrderLoading } = useOrderListQuery(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
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
    columnHelper.accessor('START_DEP', {
      header: 'Start Depo',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ORDER', {
      header: 'Order',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('CUST_NAME', {
      header: 'Customer Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientName', {
      header: 'Client Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ARR_DAY', {
      header: 'Arrival Day',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DEP_TIME', {
      header: 'Departure Time',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ADDRESS_1', {
      header: 'Address',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ZIPCODE', {
      header: 'Post Code',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/order-management-list/edit-order')}></i>
        </span>
      ),
    }),
  ];

  const handleOnChangeRouteRowIds = async (row: Updater<RowSelectionState>) => {
    await setSelected(row);
    const ids = useReactTableReturn.getSelectedRowModel();
    dispatch(setSelectedOrderIds(ids.rows.map((row) => row.original.id)));
  };

  const useReactTableReturn = useReactTable({
    data: OrderListData || orderListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selected,
    },
    onRowSelectionChange: (row) => handleOnChangeRouteRowIds(row),
    enableRowSelection: true,
  });

  const loading = IsOrderLoading;
  return <React.Fragment>{loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}</React.Fragment>;
};

export default OrderList;
