import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import CustomerReviewListing from '../../../constant/data/customer-review-list.json';

const CustomerReviewRatingList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('ORDER', {
      header: 'Order Name',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Customername', {
      header: 'Customer Name',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('RouteName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('DriverName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('ClientGroupName', {
      header: 'Client Group',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Review', {
      header: 'Customer Review',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('CreatedOnUtc', {
      header: 'Addes On',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fas fa-eye me-1"
            onClick={() => navigate('/customer-review-and-rating/driver-route-review')}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: CustomerReviewListing,
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

export default CustomerReviewRatingList;
