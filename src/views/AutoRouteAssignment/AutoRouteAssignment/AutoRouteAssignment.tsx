import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';

const AutoRouteAssignmentList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('DriverName', {
      header: 'Driver Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientGroupName', {
      header: 'Group Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('MatchingProfileName', {
      header: 'Matching Profile Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('AutoAssignStartDate', {
      header: 'Assign From',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('AutoAssignStartDate', {
      header: 'Assign Till',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RouteAssignmentRecord,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
      <Dialog title="Delete Auto Route" show={isOpen} handleClose={setCloseDialog}>
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
            <Button btnType="btn-primary" btnSize="btn-sm" className="pd-x-25" type="button">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AutoRouteAssignmentList;

const RouteAssignmentRecord = [
  {
    Id: 186,
    DriverId: 186,
    RouteName: 'Run-0002',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Claire Lee',
    MatchingProfileName: 'iss lam',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Lambeth',
  },
  {
    Id: 187,
    DriverId: 187,
    RouteName: 'Run-0003',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Winston Rose',
    MatchingProfileName: 'iss lambeth',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Lambeth',
  },
  {
    Id: 183,
    DriverId: 183,
    RouteName: 'Run-0001',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Mabanza Kitoko',
    MatchingProfileName: 'ISS Barnet',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Barnet',
  },
  {
    Id: 184,
    DriverId: 184,
    RouteName: 'Run-0002',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'matthew bailey',
    MatchingProfileName: 'ISS Barnet',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Barnet',
  },
  {
    Id: 185,
    DriverId: 185,
    RouteName: 'Run-0001',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Fernando Mendez',
    MatchingProfileName: 'iss Lambeth',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Lambeth',
  },
  {
    Id: 179,
    DriverId: 179,
    RouteName: 'Run-0001',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Erica Mead',
    MatchingProfileName: 'compass ease',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Compass East Sussex',
  },
  {
    Id: 180,
    DriverId: 180,
    RouteName: 'Run-0002',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Shaun James',
    MatchingProfileName: 'compass east',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Compass East Sussex',
  },
  {
    Id: 181,
    DriverId: 181,
    RouteName: 'Run-0003',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Ian Riley',
    MatchingProfileName: 'compass eas',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Compass East Sussex',
  },
  {
    Id: 182,
    DriverId: 182,
    RouteName: 'Run-0004',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: "Joseph O'Connor",
    MatchingProfileName: 'compass east',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Compass East Sussex',
  },
  {
    Id: 175,
    DriverId: 175,
    RouteName: 'Run-0002',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Nigel Lawrence',
    MatchingProfileName: 'caterlink',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Caterlink',
  },
  {
    Id: 164,
    DriverId: 164,
    RouteName: 'Run-0009',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Gary McRobb',
    MatchingProfileName: 'CH and Co',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'CH & Co Kent',
  },
  {
    Id: 165,
    DriverId: 165,
    RouteName: 'Run-0011',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Richard J Williams',
    MatchingProfileName: 'CH and Co',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'CH & Co Kent',
  },
  {
    Id: 166,
    DriverId: 166,
    RouteName: 'Run-0012',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Claire Knight',
    MatchingProfileName: 'CH and Co',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'CH & Co Kent',
  },
  {
    Id: 168,
    DriverId: 168,
    RouteName: 'Run-0002',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Nassor  Hamdan',
    MatchingProfileName: 'ISS Ealing BD Harrison',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'BD Together',
  },
  {
    Id: 169,
    DriverId: 169,
    RouteName: 'RUN0001',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Renisk Caprice',
    MatchingProfileName: 'ISS Ealing BD Harrison',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'ISS Ealing',
  },
  {
    Id: 170,
    DriverId: 170,
    RouteName: 'Run-0003',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Samir Laribi',
    MatchingProfileName: 'ISS Ealing BD Harrison',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'Harrison Bromley',
  },
  {
    Id: 171,
    DriverId: 171,
    RouteName: 'Run-0004',
    RouteId: '00000000-0000-0000-0000-000000000000',
    DriverName: 'Vincent Rose',
    MatchingProfileName: 'ISS Ealing BD Harrison',
    AutoAssignStartDate: '5/7/2023',
    AutoAssignEndDate: '31/8/2023',
    ClientGroupName: 'CH & Co G & G',
  },
];
