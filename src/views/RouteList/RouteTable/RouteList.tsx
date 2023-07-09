import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RouteTable = () => {
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('RouteName', {
      header: 'Route Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteStart', {
      header: 'Route Start',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('RouteDate', {
      header: 'Route Date',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/route-list/add-route')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RouteRecord,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Table useReactTableReturn={useReactTableReturn} />
      <Pagination />
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
            <Button btnType="btn-primary" btnSize="btn-sm" className="pd-x-25" type="button">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default RouteTable;

const RouteRecord = [
  {
    Id: 2902046,
    RouteId: '1bc88fc5-c2b8-4526-8ef2-3d7ca8f3286d',
    RouteName: 'Run-0009',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '2/7/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2902782,
    RouteId: '784f8bdb-0174-4dcf-8db4-9595b1568ec7',
    RouteName: 'Run-0005',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '1/7/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2902993,
    RouteId: 'a32a4f86-c566-4dbf-8559-8cb1566b4845',
    RouteName: 'Run-0002',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '30/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2902994,
    RouteId: 'ebe4527e-5076-47d5-9f28-efd95e6d6df8',
    RouteName: 'Run-0006',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '29/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2904109,
    RouteId: 'f878fa10-ea83-46f3-be00-01ec3edf1fdc',
    RouteName: 'Run-0008',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '28/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2904176,
    RouteId: '6d2a141a-b10e-4aff-9d10-ec3b4e00eb6f',
    RouteName: 'Run-0001',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '27/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2905248,
    RouteId: 'db89ad38-4447-4863-b2bb-bc74516b5570',
    RouteName: 'Run-0012',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '26/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2906125,
    RouteId: '8dbcf537-6940-42d1-9d3c-79fd5c44f40e',
    RouteName: 'Run-0004',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '25/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2906328,
    RouteId: '8d1d0059-61cb-444e-86cf-013c5649c965',
    RouteName: 'Run-0007',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '24/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2906445,
    RouteId: '346d0f80-8ad1-4e79-b94b-c30d5e7da72a',
    RouteName: 'Run-0011',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '23/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2906785,
    RouteId: 'e4884fe0-5758-4fd0-8dfb-8ed969a6439f',
    RouteName: 'Run-0003',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '22/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2895609,
    RouteId: '10a074af-9398-40c5-8fff-053602558777',
    RouteName: 'Run-0003',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '21/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2896973,
    RouteId: '35c7e6c5-a6fd-47ea-a499-561bd5bb232a',
    RouteName: 'Run-0005',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '20/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2897830,
    RouteId: 'a8f9bc7c-96ff-4172-ae68-5383ee1b2b42',
    RouteName: 'Run-0002',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '19/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2898733,
    RouteId: '49a7a361-a0b1-49e0-a858-658d733ed3b9',
    RouteName: 'Run-0001',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '18/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
  {
    Id: 2900499,
    RouteId: 'b305b5f9-76eb-48f7-bbfc-8b82029c9134',
    RouteName: 'Run-0004',
    RouteStart: null,
    RouteEnd: null,
    RouteDate: '17/6/2023',
    Deleted: false,
    IsMannualRoute: false,
  },
];
