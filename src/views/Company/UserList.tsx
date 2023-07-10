import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Table from '@/components/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/Pagination';
import Dialog from '@/components/Modal';
import { useDialogState } from '@/hooks/useDialogState';
import UserData from '../../constant/data/company-user.json';

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
    data: UserData || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <Button
                btnType="btn-outline-primary"
                icon={<i className="fa fa fa-plus"></i>}
                onClick={() => navigate('/users/create-user')}
              >
                {'New User'}
              </Button>
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
