import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import Pagination from '@/components/Pagination';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';

const UserList: React.FC = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('user', {
      header: 'Name',
      cell: (info) => (
        <span>
          {info.row.original.FirstName} {info.row.original.LastName}
        </span>
      ),
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('UserType', {
      header: 'User Type',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('PhoneNumber', {
      header: 'Phone Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('AddDate', {
      header: 'Add Date',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/users/create-user/')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: userRecords || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const breadcrumbPath = [
    {
      name: 'Company',
      path: '/users',
      active: true,
    },
  ];
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb
          breadcrumbPath={breadcrumbPath}
          button={
            <Button
              btnType="btn-outline-primary"
              icon={<i className="fa fa fa-plus"></i>}
              onClick={() => navigate('/users/create-user')}
            >
              {'New Record'}
            </Button>
          }
        />
      </Col>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <h4 className="card-title">User List</h4>
            <div className="d-flex justify-content-start mt-4">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <Table useReactTableReturn={useReactTableReturn} />
            <Pagination />
          </Card.Body>
        </Card>
      </Col>
      <Dialog title="Delete User" show={isOpen} handleClose={setCloseDialog}>
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
    </Row>
  );
};

export default UserList;

const userRecords = [
  {
    Id: null,
    UniqId: 60,
    Email: 'kate@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '079 5601 8833',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'kate',
    LastName: 'Veervers',
    UserType: 'Super Admin',
    AddDate: '29/3/2023',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'kate Veervers',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 59,
    Email: 'emma@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '07956018918',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Emma',
    LastName: 'Watkins',
    UserType: 'Super Admin',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Emma Watkins',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 58,
    Email: 'tevin@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: 'Na',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Tevin',
    LastName: 'Tobun',
    UserType: 'Super Admin',
    AddDate: '29/3/2023',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Tevin Tobun',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 57,
    Email: 'marcel@rout-d.com',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: 'na',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Marcel',
    LastName: 'Reid',
    UserType: 'Super Admin',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Marcel Reid',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 55,
    Email: 'marc@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '07799343678',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '29/3/2023',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Marc',
    LastName: 'Varley',
    UserType: 'Super Admin',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Marc Varley',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 53,
    Email: 'Cassia@rout-d.com',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: 'na',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Cassia',
    LastName: 'Lamy',
    UserType: 'Super Admin',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Cassia Lamy',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 48,
    Email: 'ade@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '020 7622 4445',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Ade',
    LastName: 'Adenuga',
    UserType: 'Super Admin',
    AddDate: '29/3/2023',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Ade Adenuga',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 46,
    Email: 'oleandsteendeliveries@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '075724384698',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Bipin',
    LastName: 'Patel',
    UserType: 'Super Admin',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Bipin Patel',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 43,
    Email: 'pooleteamleader@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '07398724909',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Natalie',
    LastName: 'Streamer',
    UserType: 'Foodmove',
    AddDate: '29/3/2023',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Natalie Streamer',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 35,
    Email: 'davidb@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '07946667840',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'David',
    LastName: 'Blackwood',
    UserType: 'Foodmove',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'David Blackwood',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 32,
    Email: 'toni@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: 'na',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Toni',
    LastName: 'Tsonev',
    UserType: 'Foodmove',
    AddDate: '29/3/2023',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Toni Tsonev',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
  {
    Id: null,
    UniqId: 27,
    Email: 'arnold@gv-group.co.uk',
    EmailConfirmed: false,
    PasswordHash: null,
    SecurityStamp: null,
    PhoneNumber: '+447366559191',
    PhoneNumberConfirmed: false,
    TwoFactorEnabled: false,
    LockoutEndDateUtc: '/Date(-62135596800000)/',
    LockoutEnabled: false,
    AccessFailedCount: 0,
    UserName: null,
    FirstName: 'Arnold',
    LastName: 'sk',
    UserType: 'Foodmove',
    AddDate: '12/10/2022',
    ModifyDate: null,
    IsActive: false,
    CreatedById: null,
    BusinessName: null,
    FullName: 'Arnold sk',
    ProfilePicture: null,
    PageUrl: null,
    CustomerGroupId: 0,
    Title: null,
    Password: null,
    ClientId: null,
    ClientIdInt: 0,
  },
];
