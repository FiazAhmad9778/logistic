import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { Card, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DriverList = () => {
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
    columnHelper.accessor('ClientGroupName', {
      header: 'Group Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DriverId', {
      header: 'Driver Id',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('Mobile', {
      header: 'Contact Date',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('DriverOnlineStatus', {
      header: 'Online Status',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="fa fa-edit me-1" onClick={() => navigate('/drivers/create-driver')}></i>
          <i className="far fa-trash-alt" onClick={setOpenDialog}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: DriverRecord,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <h4 className="card-title">Driver List</h4>
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
      <Dialog title="Delete Driver" show={isOpen} handleClose={setCloseDialog}>
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

export default DriverList;

const DriverRecord = [
  {
    Id: 184,
    DriverId: 'Zbutt',
    Name: null,
    FirstName: 'Zeeshan',
    LastName: 'Butt',
    Email: 'zeeabutt@outlook.com',
    Password: null,
    Mobile: 'na',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1686833388043)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 125,
    DriverId: 'OleandSteen001',
    Name: null,
    FirstName: 'Zakariya',
    LastName: 'Ali',
    Email: 'saad786x@hotmail.com',
    Password: null,
    Mobile: '07861233456',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664251208237)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '50462',
    VehicleRegistrationNumber: 'WM19CYA',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 144,
    DriverId: 'ZSteele',
    Name: null,
    FirstName: 'Zachary',
    LastName: 'Steele',
    Email: 'steelezac233@gmail.com',
    Password: null,
    Mobile: '07950739803',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1666690219837)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 19,
    ClientGroupName: 'ESS Project',
    Mileage: '61055',
    VehicleRegistrationNumber: 'CE20KMM',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 202,
    DriverId: 'CH&CoG&G1',
    Name: null,
    FirstName: 'Vincent',
    LastName: 'Rose',
    Email: 'vincentrosegv@gmail.com',
    Password: null,
    Mobile: 'na',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687165007197)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 25,
    ClientGroupName: 'CH & Co G & G',
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 145,
    DriverId: 'Oleandsteen018',
    Name: null,
    FirstName: 'Teotonio',
    LastName: 'Mascarenhas',
    Email: 'teotonio.dxb@gmail.com',
    Password: null,
    Mobile: '07424512448',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1667163313427)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '31277',
    VehicleRegistrationNumber: 'NV21CXZ',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 175,
    DriverId: 'Ole and Steen -034',
    Name: null,
    FirstName: 'Telbirth',
    LastName: 'Johnson',
    Email: 'teeshut69@gmail.com',
    Password: null,
    Mobile: '07591725975',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1682391488030)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '50224',
    VehicleRegistrationNumber: 'WM19CXX',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 157,
    DriverId: 'Ole and Steen 023',
    Name: null,
    FirstName: 'Tambi',
    LastName: 'Nasumba',
    Email: 'tambinasumba@gmail.com',
    Password: null,
    Mobile: '07770797838',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1679084885910)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '41588',
    VehicleRegistrationNumber: 'WM19CXU',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 127,
    DriverId: 'OleandSteen004',
    Name: null,
    FirstName: 'Subramaniam',
    LastName: 'Thillainathan',
    Email: 'subramsutha@yahoo.co.uk',
    Password: null,
    Mobile: '0775724659',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664251700580)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '7024',
    VehicleRegistrationNumber: 'SL22NXU',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 200,
    DriverId: 'HB1',
    Name: null,
    FirstName: 'Samir',
    LastName: 'Laribi',
    Email: 'Samir_Harrods@yahoo.fr',
    Password: null,
    Mobile: '07375 658 056',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687165007133)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 24,
    ClientGroupName: 'Harrison Bromley',
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 169,
    DriverId: 'Ole and Steen-025',
    Name: null,
    FirstName: 'Sam',
    LastName: 'Olaniyan',
    Email: 'samolaniyan@gmail.com',
    Password: null,
    Mobile: '07446419564',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1680147916900)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '98455',
    VehicleRegistrationNumber: 'KU22WZO',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 164,
    DriverId: 'Ole and Steen-028',
    Name: null,
    FirstName: 'Saim',
    LastName: 'Uddain',
    Email: 'suddin44@yahoo.com',
    Password: null,
    Mobile: '07917294836',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1679341216617)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '009905',
    VehicleRegistrationNumber: 'KU22WZU',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 201,
    DriverId: 'CH&Co8',
    Name: null,
    FirstName: 'Richard J',
    LastName: 'Williams',
    Email: 'userw6702@aol.com',
    Password: null,
    Mobile: 'na',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687165007163)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 20,
    ClientGroupName: 'CH & Co Kent',
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 199,
    DriverId: 'ISSE1',
    Name: null,
    FirstName: 'Renisk',
    LastName: 'Caprice',
    Email: 'rcaprice@hotmail.com',
    Password: null,
    Mobile: 'na',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687165007103)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 22,
    ClientGroupName: 'ISS Ealing',
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 1,
    DriverId: 'Rajshree@123',
    Name: null,
    FirstName: 'Rajshree',
    LastName: 'jain',
    Email: 'rajshree@officebox.vervelogic.com',
    Password: null,
    Mobile: '9855768600',
    Address: 'jaipur, india',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1596628530697)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '2500',
    VehicleRegistrationNumber: 'TESTING',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 131,
    DriverId: 'OleandSteen007',
    Name: null,
    FirstName: 'Rajasingham',
    LastName: 'Gunapalan',
    Email: 'rguna1958@gmail.com',
    Password: null,
    Mobile: '07725711230',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664252016267)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '38781',
    VehicleRegistrationNumber: 'MM19CXT',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 153,
    DriverId: '001942',
    Name: null,
    FirstName: 'promise',
    LastName: 'osagie',
    Email: 'promisechessosagie.15@gmail.com',
    Password: null,
    Mobile: '+2348084849448',
    Address: 'lekki lagos',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1676540375580)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 19,
    ClientGroupName: 'ESS Project',
    Mileage: '58',
    VehicleRegistrationNumber: 'XF67877',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 51,
    DriverId: 'PooleAgency',
    Name: null,
    FirstName: 'Poole',
    LastName: 'Agency',
    Email: 'poolehub@gmail.com',
    Password: null,
    Mobile: '07375659362',
    Address: 'Dorset',
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1614072809353)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '21356',
    VehicleRegistrationNumber: 'MW25YPP',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 64,
    DriverId: 'PaulLindsell',
    Name: null,
    FirstName: 'Paul',
    LastName: 'Lindsell',
    Email: 'Plindsell2@gmail.com',
    Password: null,
    Mobile: '07432 085428',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1628632637993)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '73485',
    VehicleRegistrationNumber: 'WP19NXB',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 132,
    DriverId: 'OleandSteen008',
    Name: null,
    FirstName: 'Pathmanathan',
    LastName: 'Kirushanth',
    Email: 's4nth1913@gmail.com',
    Password: null,
    Mobile: '07546420685',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664252082687)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '38400',
    VehicleRegistrationNumber: 'WM19CXU',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 133,
    DriverId: 'oleandsteen009',
    Name: null,
    FirstName: 'Paskaran',
    LastName: 'Nagarathinam',
    Email: 'paskaran_nag@yahoo.co.uk',
    Password: null,
    Mobile: '02080908408',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664252145297)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '27680',
    VehicleRegistrationNumber: 'YF71DHZ',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 152,
    DriverId: 'Ole and Steen 022',
    Name: null,
    FirstName: 'Nathaliel',
    LastName: 'Alleyne',
    Email: 'nathanalleyne@hotmail.co.uk',
    Password: null,
    Mobile: '07549991721',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1676266164247)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '8',
    VehicleRegistrationNumber: 'WM19CYX',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 37,
    DriverId: 'NatStreamer',
    Name: null,
    FirstName: 'Natalie',
    LastName: 'Streamer',
    Email: 'pooleteamleader@gv-group.co.uk',
    Password: null,
    Mobile: '07398724909',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1611649718460)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '70995',
    VehicleRegistrationNumber: 'CK20NSO',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 198,
    DriverId: 'BDT1',
    Name: null,
    FirstName: 'Nassor ',
    LastName: 'Hamdan',
    Email: 'nasser75@live.co.uk',
    Password: null,
    Mobile: '07956 018 909',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687165007070)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 21,
    ClientGroupName: 'BD Together',
    Mileage: '0',
    VehicleRegistrationNumber: '0',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 135,
    DriverId: 'oleandsteen0010',
    Name: null,
    FirstName: 'Nadeshakumar',
    LastName: 'Seenithamby',
    Email: 'nseen@hotmail.co.uk',
    Password: null,
    Mobile: '07962292049',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1664252278390)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '98800',
    VehicleRegistrationNumber: 'KKU22WZ',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 181,
    DriverId: 'Ole and Steen- 033',
    Name: null,
    FirstName: 'Michael',
    LastName: 'Jonas',
    Email: 'michael.jonas@hotmail.co.uk',
    Password: null,
    Mobile: '07367433437',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1685007500303)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '49786',
    VehicleRegistrationNumber: 'WM19CXX',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 204,
    DriverId: 'Ole and Steen -038',
    Name: null,
    FirstName: 'Michael',
    LastName: 'French',
    Email: 'mppcpy@gmail.com',
    Password: null,
    Mobile: '07724663202',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1687204245147)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: true,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 18,
    ClientGroupName: 'Ole and Steen',
    Mileage: '39441',
    VehicleRegistrationNumber: 'WM19CXT',
    IsSafetyCheckApprovedByAdmin: 0,
  },
  {
    Id: 91,
    DriverId: 'PBDORSET4',
    Name: null,
    FirstName: 'Martin ',
    LastName: 'Ellis    ',
    Email: 'familyellis@hotmail.co.uk',
    Password: null,
    Mobile: '07956 018921',
    Address: null,
    ProfileImage: null,
    Deleted: false,
    Active: false,
    CreatedOnUtc: '/Date(1655900083363)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    DeviceType: null,
    DeviceId: null,
    DeviceToken: null,
    SafetyCheckStatus: false,
    DriverOnlineStatus: false,
    IsFaultySafetyCheck: false,
    IsMinorFaultySafetyCheck: false,
    Status: null,
    ClientGroupId: 0,
    ClientGroupName: null,
    Mileage: '21257',
    VehicleRegistrationNumber: 'CE20KMV',
    IsSafetyCheckApprovedByAdmin: 0,
  },
];
