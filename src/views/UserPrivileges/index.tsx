import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { randomNumber } from '@/helpers/function/random-number';
import {
  toggleDeleteNewRoleDialog,
  toggleNewRoleDialog,
} from '@/infrastructure/store/features/user-privileges/user-privileges-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-bootstrap/Modal';
import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
const UserPrivileges = () => {
  const { newRoleDialog, deleteRoleDialog } = useAppSelector((state) => state['user']);
  const useFormReturn = useForm();
  const diapatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('id', {
      header: '#',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Role Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: () => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="far fa-trash-alt"></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: roleRecord || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNewRoleDialog = () => {
    diapatch(toggleNewRoleDialog(false));
  };
  const handleDeleteRoleDialog = () => {
    diapatch(toggleDeleteNewRoleDialog(false));
  };
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb breadcrumbTitle="User Privileges Management" />
      </Col>
      <Col md={6}>
        <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
          <Form.Select
            name="role"
            options={[
              { value: 'Accountant', name: 'Accountant' },
              { value: 'Foodmove', name: 'Foodmove' },
              { value: 'Manager', name: 'Manager' },
            ]}
            onChange={(value) => console.log(value)}
          />
        </Form>
      </Col>
      <Col md={6}>
        <div className="d-flex justify-content-end mb-3">
          <Button
            type="submit"
            btnType="btn-danger"
            className="me-2"
            icon={<i className="far fa-trash-alt"></i>}
            onClick={() => diapatch(toggleDeleteNewRoleDialog(true))}
          >
            {'Delete Role'}
          </Button>
          <Button
            type="submit"
            btnType="btn-primary"
            icon={<i className="fa fa fa-plus"></i>}
            btnSize="btn-sm"
            onClick={() => diapatch(toggleNewRoleDialog(true))}
          >
            {'New Role'}
          </Button>
          <div>
            <Dialog title="Added Role" show={deleteRoleDialog} handleClose={handleDeleteRoleDialog}>
              <div className="my-2">
                <Table useReactTableReturn={useReactTableReturn} />
                <div className="d-flex justify-content-end mt-4">
                  <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={handleDeleteRoleDialog}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
          <div>
            <Dialog title="Add Role" show={newRoleDialog} handleClose={handleNewRoleDialog}>
              <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
                <Form.Select label="Role Name" name="role" options={[]} />
                <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
                  <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={handleNewRoleDialog}>
                    Cancel
                  </Button>
                  <Button btnSize="btn-sm">Save</Button>
                </div>
              </Form>
            </Dialog>
          </div>
        </div>
      </Col>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Body className="pt-4">
            <Row>
              {privilegesRecord?.map((item) => (
                <Col md={4} key={item.name} className="my-3">
                  <div className="h-100">
                    <div className="border bd-primary br-ts-5 br-te-5">
                      <p className="tx-16 tx-semibold px-4 mb-0 py-2 bg-primary tx-white br-ts-3 br-te-3">
                        {item.name}
                      </p>
                    </div>
                    <div className="border privileges-body br-bs-5 br-be-5">
                      <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
                        {item.permissions.map((item) => (
                          <div
                            key={item.name}
                            className="d-flex justify-content-between align-items-center privileges-form-checkbox my-3"
                          >
                            <p className="mb-0">
                              {item.icon} {item.name}
                            </p>
                            <Form.Checkbox id={item.id} name={item.name} />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                </Col>
              ))}
              <Col md={12}>
                <div className="d-flex justify-content-end mt-4">
                  <Button type="submit">Save</Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserPrivileges;

const privilegesRecord = [
  {
    name: 'Driver Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'User Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Customer Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Client Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Vehicle Safety Check',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Jobs Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Job Assignment Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Cancel', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Route Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Profile Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Route Assignment Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Cancel', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Order List Management',
    permissions: [
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Questions Related To Orders',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Temprature Range Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Delivery Recipient Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Automated Emails Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Mailshot To Customers Management',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Customer Satisfaction Survey Questions',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Mobile App Push Notifications',
    permissions: [
      { id: randomNumber(), name: 'Add', icon: <i className="far fa-plus-square tx-primary"></i>, isTrue: true },
      { id: randomNumber(), name: 'Edit', icon: <i className="fa fa-edit me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: false },
      { id: randomNumber(), name: 'Delete', icon: <i className="far fa-trash-alt tx-primary"></i>, isTrue: false },
    ],
  },
  {
    name: 'Report',
    permissions: [
      { id: randomNumber(), name: 'View', icon: <i className="fas fa-eye me-1 tx-primary"></i>, isTrue: true },
    ],
  },
];

const roleRecord = [
  {
    id: '1',
    name: 'Accountant',
  },
  {
    id: '2',
    name: 'Foodmove',
  },
  {
    id: '3',
    name: 'Manager',
  },
  {
    id: '4',
    name: 'Ole & Steen',
  },
];
