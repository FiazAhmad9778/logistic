import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { IMAGES } from '@/assets/images';
import Dialog from '@/components/Modal';
import Button from '@/components/Button';
import { useDialogState } from '@/hooks/useDialogState';

const VehicleSafetyCheckList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('CheckName', {
      header: 'Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('checkDescription', {
      header: 'Vehicle Safety Check Description',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('checkActive', {
      header: 'Status',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Active' : ''}</span>
      ),
    }),
    columnHelper.accessor('DefaultValue', {
      header: 'Default Value',
      cell: ({ getValue }) => <span>{`${getValue()}`}</span>,
    }),
    columnHelper.accessor('IsMajorFault', {
      header: 'Major Fault',
      cell: ({ getValue }) => <span>{getValue() ? 'Not a Major Fault' : 'Major Fault'}</span>,
    }),
    columnHelper.accessor('createOn', {
      header: 'Create On',
      cell: ({ getValue }) => <span>{getValue() || '15/2/2021'}</span>,
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
      <Dialog title="Delete Vahicle" show={isOpen} handleClose={setCloseDialog}>
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
export default VehicleSafetyCheckList;

const RouteAssignmentRecord = [
  {
    Id: 11,
    CheckName: 'Windscreen Visibility',
    checkDescription: 'Is there good visibility for the driver through the front and side windows?',
    CheckLogo: <img src={IMAGES.WINDOWSCREEN} alt="window screen" />,
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397419070)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 10,
    CheckName: 'Windscreen Functionality',
    checkDescription: 'Does the windscreen wash, wipers and demist work correctly',
    CheckLogo: '25022021-AV0QLWY72S.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397395033)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 16,
    CheckName: 'Windscreen Damage',
    checkDescription: 'Is the windscreen clear of chips/cracks?',
    CheckLogo: '25022021-ZDFF3DWCMX.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397584710)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 21,
    CheckName: 'Vehicle Registration Number',
    checkDescription: 'Vehicle Registration Number',
    CheckLogo: 'DefaultImage.jpg',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1615892132850)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Text',
    IsMajorFault: false,
    DefaultValue: false,
    IsNumberOnly: false,
  },
  {
    Id: 6,
    CheckName: 'Vehicle refrigerator/inverter',
    checkDescription: 'Is the refrigerator/inverter working correctly? (If applicable)',
    CheckLogo: '25022021-KJH6AUSMZ2.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397245723)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 20,
    CheckName: 'Vehicle Doors',
    checkDescription: 'Do all the vehicle doors open, close and lock correctly?',
    CheckLogo: '25022021-I247F2BP1F.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1614174541520)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: true,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 9,
    CheckName: 'Vehicle Dashboard',
    checkDescription: 'Are all dash gauges working correctly and no warning lights on?',
    CheckLogo: '25022021-SUCSZLZN03.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397347950)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 7,
    CheckName: 'Vehicle cleanliness',
    checkDescription: 'Is the goods section of the vehicle clean and tidy?',
    CheckLogo: '25022021-8RLCUR8VVN.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397278277)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 15,
    CheckName: 'Tyres and Wheels',
    checkDescription: 'Are the wheels in good condition and have at least 1.6mm of tread?',
    CheckLogo: '25022021-E2M6ZCA81O.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397559977)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 5,
    CheckName: 'Seats Position',
    checkDescription: 'Is the seat in the correct position for the driver?',
    CheckLogo: '25022021-1SNJJ4BDM8.jpg',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397219313)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 4,
    CheckName: 'Seat Belts',
    checkDescription: 'Do the seatbelts work correctly?',
    CheckLogo: '25022021-FGVRICC8PF.jpg',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397188223)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: true,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 25,
    CheckName: 'PPE safety equipment',
    checkDescription: 'Are you wearing your PPE safety equipment?',
    CheckLogo: '05072022-0D2FUK732C.jpg',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1657024561340)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 19,
    CheckName: 'Number Plates',
    checkDescription: 'Are the number plates clearly visible?',
    CheckLogo: '25022021-NJ6G42E0E7.jpg',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397645827)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 2,
    CheckName: 'Mirrors',
    checkDescription: 'Are the mirrors fitted and adjusted correctly?',
    CheckLogo: '25022021-ACB459WOZQ.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397085943)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 23,
    CheckName: 'MIleage',
    checkDescription: "Please accurately add your vehicle's mileage",
    CheckLogo: '04082021-YY0U2O2W5A.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1628237146753)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Text',
    IsMajorFault: false,
    DefaultValue: false,
    IsNumberOnly: false,
  },
  {
    Id: 12,
    CheckName: 'Lights',
    checkDescription: 'Are all lights and reflectors fitted, working and in good condition?',
    CheckLogo: '25022021-ACMTZVLTJR.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397445140)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 13,
    CheckName: 'Fluids',
    checkDescription:
      'Is the AdBlue, engine oil, water, windscreen wash and fuel levels checked and sufficiently filled with no leaks?',
    CheckLogo: '25022021-0H867ZR3BW.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397472473)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 24,
    CheckName: 'Confirming I have completed the vehicle check and I am ready to start work',
    checkDescription: null,
    CheckLogo: '05072022-0XNSE7XQCV.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1655729711470)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 1,
    CheckName: 'Brakes',
    checkDescription: 'Is the steering and foot/handbrake working correctly?',
    CheckLogo: '25022021-YN7FCE46RC.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397043923)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: true,
    DefaultValue: true,
    IsNumberOnly: false,
  },
  {
    Id: 17,
    CheckName: 'Bodywork',
    checkDescription: 'Is the vehicle body in good condition?',
    CheckLogo: '25022021-6XWFEKM543.png',
    checkActive: true,
    Deleted: false,
    CreatedOnUtc: '/Date(1613397603583)/',
    UpdatedOnUtc: '/Date(-62135596800000)/',
    FieldType: 'Yes/No',
    IsMajorFault: false,
    DefaultValue: true,
    IsNumberOnly: false,
  },
];
