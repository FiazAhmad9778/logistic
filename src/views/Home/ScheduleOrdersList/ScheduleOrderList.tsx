import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import { getDateFormatMDY } from '@/helpers/function/date-format';

const ScheduleOrderList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('profileName', {
      header: 'Profile Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('registrationNumber', {
      header: 'Vehicle Registration Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('driverName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('clientGroup', {
      header: 'Client Group',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('routeDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.accessor('predictedDistance', {
      header: 'Predicted Distance',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderDetails', {
      header: 'Order Details',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
    </React.Fragment>
  );
};
export default ScheduleOrderList;
