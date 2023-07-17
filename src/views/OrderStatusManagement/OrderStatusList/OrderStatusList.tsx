import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusListData from '../../../constant/data/orders-status-list.json';
import { useOrderStatusByIdQuery } from '@/infrastructure/store/api/order-status/order-status-api';
import Loader from '@/components/Loader';

const OrderStatusList = () => {
  const navigate = useNavigate();
  const { data: orderStatusListing, isLoading: IsOrderStatusLoading } = useOrderStatusByIdQuery(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('OrderName', {
      header: 'Order Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('CustomerName', {
      header: 'Customer Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Complete', {
      header: 'Order Status',
      cell: () => <span>{'Completed'}</span>,
    }),
    columnHelper.accessor('ClientName', {
      header: 'Client Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DriverName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('StatusName', {
      header: 'Status Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DEP_TIME', {
      header: 'Departure Time',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fas fa-eye me-1"
            onClick={() =>
              navigate('/order-status-management/view-order-status', {
                state: {
                  orderStatusId: info.row.original.id,
                },
              })
            }
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: OrderStatusListData || orderStatusListing,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const loading = IsOrderStatusLoading;
  return <React.Fragment>{loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}</React.Fragment>;
};

export default OrderStatusList;
