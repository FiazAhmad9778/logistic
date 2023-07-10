import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import AddOrderInstructionDialog from '../AddOrderInstruction/AddOrderInstructionDialog';
import OrderListData from '../../../constant/data/orders-list.json';

const OrderList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
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
          <i className="fa fa-edit me-1" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: OrderListData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <AddOrderInstructionDialog isOpen={isOpen} setCloseDialog={setCloseDialog} />
    </React.Fragment>
  );
};

export default OrderList;
