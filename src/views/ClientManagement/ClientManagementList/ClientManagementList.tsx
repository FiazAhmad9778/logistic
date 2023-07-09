import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useDialogState } from '@/hooks/useDialogState';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';

const ClientManagementList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('ClientName', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('PersonOfContactName', {
      header: 'Contact Person',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientEmail', {
      header: 'Contact Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ClientMobile', {
      header: 'Contact Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('CreatedOnUtc', {
      header: 'Date Created',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('MatchingProfileText', {
      header: 'Matching Profile Text',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Actions</span>,
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
      <Dialog title="Delete Client" show={isOpen} handleClose={setCloseDialog}>
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
export default ClientManagementList;

const RouteAssignmentRecord = [
  {
    ClientId: 49,
    ClientName: 'Ole and Steen 26 01 23',
    ClientFirstName: null,
    ClientLastName: null,
    PersonOfContactName: 'Awais Malik',
    ClientAddress1: null,
    ClientAddress2: null,
    ClientCity: null,
    ClientState: null,
    ClientCountry: null,
    ClientPostalCode: null,
    ClientLongitude: null,
    ClientLatitude: null,
    ClientMobile: '07825990483',
    ClientEmail: 'awais.malik@oleandsteen.co.uk',
    IsDeleted: false,
    IsActive: false,
    CreatedOnUtc: '26/1/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    Password: null,
    ProfileId: 0,
    ProfileName: null,
    MatchingProfileText: 'Ole and Steen',
    SecurityKey: null,
    KeyValidTill: null,
    BufferTime: 0,
  },
  {
    ClientId: 55,
    ClientName: 'Ole and Steen 06 04 23',
    ClientFirstName: null,
    ClientLastName: null,
    PersonOfContactName: 'Sherry Joshi',
    ClientAddress1: null,
    ClientAddress2: null,
    ClientCity: null,
    ClientState: null,
    ClientCountry: null,
    ClientPostalCode: null,
    ClientLongitude: null,
    ClientLatitude: null,
    ClientMobile: null,
    ClientEmail: 'Sherry.Joshi@oleandsteen.co.uk',
    IsDeleted: false,
    IsActive: false,
    CreatedOnUtc: '26/1/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    Password: null,
    ProfileId: 0,
    ProfileName: null,
    MatchingProfileText: 'Ole',
    SecurityKey: null,
    KeyValidTill: null,
    BufferTime: 0,
  },
  {
    ClientId: 57,
    ClientName: 'ESS Zachary 260423 part 2',
    ClientFirstName: null,
    ClientLastName: null,
    PersonOfContactName: 'Harry Hyman',
    ClientAddress1: null,
    ClientAddress2: null,
    ClientCity: null,
    ClientState: null,
    ClientCountry: null,
    ClientPostalCode: null,
    ClientLongitude: null,
    ClientLatitude: null,
    ClientMobile: null,
    ClientEmail: 'Harry.Hyman@compass-group.co.uk',
    IsDeleted: false,
    IsActive: false,
    CreatedOnUtc: '26/1/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    Password: null,
    ProfileId: 0,
    ProfileName: null,
    MatchingProfileText: 'ESS',
    SecurityKey: null,
    KeyValidTill: null,
    BufferTime: 0,
  },
];
