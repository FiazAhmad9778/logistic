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
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Body className="pt-4">
            <div className="d-flex justify-content-end gap-3 mb-3">
              <Button
                type="submit"
                btnType="btn-outline-primary"
                icon={<i className="fa fa fa-plus"></i>}
                onClick={() => diapatch(toggleDeleteNewRoleDialog(true))}
              >
                {'Delete Role'}
              </Button>
              <Button
                type="submit"
                btnType="btn-outline-primary"
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
                      <Button
                        type="button"
                        btnType="btn-outline-danger"
                        btnSize="btn-sm"
                        onClick={handleDeleteRoleDialog}
                      >
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
            <Row>
              <Col md={4}>
                <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
                  <Form.Select
                    label="Role"
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
            </Row>
            <Row className="mt-4">
              {privilegesRecord?.map((item) => (
                <Col md={4} key={item.name} className="my-3">
                  <div>
                    <p className="tx-16 tx-semibold pb-2 border-bottom">{item.name}</p>
                    <div>
                      <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
                        {item.permissions.map((item) => (
                          <div
                            key={item.name}
                            className="d-flex justify-content-between align-items-center privileges-form-checkbox my-3"
                          >
                            <Form.Checkbox id={item.id} name={item.name} />
                            <p className="mb-0">{item.name}</p>
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
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'User Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Customer Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Client Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Vehicle Safety Check',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Jobs Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Job Assignment Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Cancel', isTrue: false },
    ],
  },
  {
    name: 'Route Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Profile Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Route Assignment Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Cancel', isTrue: false },
    ],
  },
  {
    name: 'Order List Management',
    permissions: [{ id: randomNumber(), name: 'View', isTrue: false }],
  },
  {
    name: 'Questions Related To Orders',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Temprature Range Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Delivery Recipient Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Automated Emails Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Mailshot To Customers Management',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Customer Satisfaction Survey Questions',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Mobile App Push Notifications',
    permissions: [
      { id: randomNumber(), name: 'Add', isTrue: true },
      { id: randomNumber(), name: 'Edit', isTrue: false },
      { id: randomNumber(), name: 'View', isTrue: false },
      { id: randomNumber(), name: 'Delete', isTrue: false },
    ],
  },
  {
    name: 'Report',
    permissions: [{ id: randomNumber(), name: 'View', isTrue: true }],
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
