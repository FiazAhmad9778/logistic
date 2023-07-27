import Table from '@/components/Table';
import { RowSelectionState, Updater, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useOrderListQuery } from '@/infrastructure/store/api/order/order-api';
import Loader from '@/components/Loader';
import { useNavigate } from 'react-router-dom';
import TableCheckbox from '@/components/Table/TableCheckbox';
import { setSelectedOrderIds } from '@/infrastructure/store/features/order/order-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import IconButton from '@/components/Permission/action-icon';
import { ClaimCode } from 'src/enums/claim-codes';

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
      cell: ({ row }) => (
        <span className="justify-content-center gap-2">
          <TableCheckbox
            {...{
              checked: row.original.routeId !== null ? true : row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              disabled: row.original.routeId === null ? false : true,
            }}
          />
        </span>
      ),
    }),
    columnHelper.accessor('uniqueReferenceCode', {
      header: 'Reference Code',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('routeName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderName', {
      header: 'Order Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderStatusName', {
      header: 'Order Status',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderWindowOpen', {
      header: 'Order Window Open',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderWindowClose', {
      header: 'Order Window Close',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('productWeight', {
      header: 'product Weight',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('customerName', {
      header: 'Customer Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('customerEmail', {
      header: 'Customer Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('customerMobile', {
      header: 'Customer Mobile',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('townCity', {
      header: 'Town City',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('postCode', {
      header: 'Post Code',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Create Order',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <IconButton
            requiredClaims={[ClaimCode.OMV]}
            className="fas fa-eye me-1"
            onClick={() =>
              navigate('/order-management-list/view-order', {
                state: {
                  orderId: info.row.original.id,
                },
              })
            }
          />
          <IconButton
            requiredClaims={[ClaimCode.OME]}
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/order-management-list/edit-order', {
                state: {
                  orderId: info.row.original.id,
                },
              })
            }
          />
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
    data: orderListing?.data || [],
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
