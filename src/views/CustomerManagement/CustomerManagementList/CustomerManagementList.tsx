import React from 'react';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';

const CustomerManagementList = () => {
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('Name', {
      header: 'Customer Name',
      cell: (info) => (
        <span>
          {info.row.original.FirstName} {info.row.original.LastName}
        </span>
      ),
    }),
    columnHelper.accessor('CustomerId', {
      header: 'Customer ID',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Mobile', {
      header: 'Customer Contact Number',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('Address', {
      header: 'Customer Address',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('CreatedOnUtc', {
      header: 'Created On',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.display({
      id: 'Create Order Instruction',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/customer-management/add-customer')}></i>
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
      <Dialog title="Delete Customer" show={isOpen} handleClose={setCloseDialog}>
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

export default CustomerManagementList;

const RouteRecord = [
  {
    Id: 94,
    CustomerId: 'CH4',
    FirstName: 'The Very Good',
    LastName: 'Hospitality',
    Email: 'arnold@gv-group.co.uk',
    Password: null,
    Mobile: '+447366559191',
    Address: '15 Holland Road',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 91,
    CustomerId: 'CC169202283023689',
    FirstName: 'Windsor',
    LastName: 'Store',
    Email: 'Windsor@oleandsteen.co.uk',
    Password: null,
    Mobile: '02030024594',
    Address: '126 King Edward Court, Windsor, SL4 1TH',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 90,
    CustomerId: 'CC169202283023689',
    FirstName: 'Wigmore',
    LastName: 'Store',
    Email: 'wigmore@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039484000',
    Address: 'Unit 1, 71-73 Wigmore Street, London, W1U 1QA',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 89,
    CustomerId: 'CC169202283023689',
    FirstName: 'Westfield',
    LastName: 'White City',
    Email: 'westfieldwhitecity@oleandsteen.co.uk',
    Password: null,
    Mobile: '2039557450',
    Address: 'Ariel Way, Unit SU1203, Shepherds Bush, London, W12 7HT',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 88,
    CustomerId: 'CC169202283023689',
    FirstName: 'Victoria',
    LastName: 'Nova',
    Email: 'victorianova@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039088555',
    Address: 'Nova South, 1 Sir Simon Milton Square, London, SW1E 5DJ',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 87,
    CustomerId: 'CC169202283023689',
    FirstName: 'Tottenham',
    LastName: 'Court Road',
    Email: 'tottenhamcourtroad@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039484888',
    Address: '1 Bedford Avenue, Unit 4, Fitzrovia, London, WC1B 3AU',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 86,
    CustomerId: 'CC169202283023689',
    FirstName: 'Strand',
    LastName: 'Store',
    Email: 'Strand@oleandsteen.co.uk',
    Password: null,
    Mobile: '02045486996',
    Address: '351-353 Strand, London, WC2R 0HS',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 85,
    CustomerId: 'CC169202283023689',
    FirstName: 'St',
    LastName: 'James',
    Email: 'stjames@oleandsteen.co.uk',
    Password: null,
    Mobile: '02038288242',
    Address: '56 Haymarket, No 2, London, SW1Y 4RP',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 84,
    CustomerId: 'CC169202283023689',
    FirstName: 'Seven',
    LastName: 'Dials',
    Email: 'SevenDials@oleandsteen.co.uk',
    Password: null,
    Mobile: '02033769676',
    Address: '39-43 Neal Street, London, WC2H 9QG ',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 83,
    CustomerId: 'CC169202283023689',
    FirstName: 'Richmond',
    LastName: 'Store',
    Email: 'richmond@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039088222',
    Address: '59 George Street, London, TW91HE',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 82,
    CustomerId: 'CC169202283023689',
    FirstName: 'Oxford',
    LastName: 'Circus',
    Email: 'oxfordcircus@oleandsteen.co.uk',
    Password: null,
    Mobile: '01865952286',
    Address: '46 Eastcastle St, Fitzrovia, London, W1W 8DX',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 74,
    CustomerId: 'CC169202283023689',
    FirstName: 'Hampstead',
    LastName: 'Store',
    Email: 'Hampstead@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039557449',
    Address: '38 - 40 Hampstead High St, London, NW3 1QE',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 73,
    CustomerId: 'CC169202283023689',
    FirstName: 'Guildford',
    LastName: 'Store',
    Email: 'Guildford@oleandsteen.co.uk',
    Password: null,
    Mobile: '+447366559190',
    Address: '118 High Street, Guildford, GU1 3QH',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 72,
    CustomerId: 'CC169202283023689',
    FirstName: 'Chiswick',
    LastName: 'Chiswick',
    Email: 'Chiswick@oleandsteen.co.uk',
    Password: null,
    Mobile: '02033262621',
    Address: '260-262 Chiswick High Road, London, W4 1PD',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
  {
    Id: 71,
    CustomerId: 'CC169202283023689',
    FirstName: 'Canary',
    LastName: 'Wharf',
    Email: 'canarywharf@oleandsteen.co.uk',
    Password: null,
    Mobile: '02039087000',
    Address: 'CR34, Crossrail Place, London, E14 5AR',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '13/3/2023',
    UpdatedOnUtc: '/Date(-62135596800000)/',
  },
];
