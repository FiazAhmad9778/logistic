import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusListData from '../../../constant/data/orders-status-list.json';

const OrderStatusList = () => {
  const navigate = useNavigate();
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
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fas fa-eye me-1" onClick={() => navigate('/order-status-management/view-order-status')}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: OrderStatusListData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
    </React.Fragment>
  );
};

export default OrderStatusList;
