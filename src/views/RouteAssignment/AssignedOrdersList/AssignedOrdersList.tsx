import React from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';

const AssignedOrdersList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor('OrderId', {
      header: 'Order Number',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('CUST_NAME', {
      header: 'Customer Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ADDRESS_1', {
      header: 'Address',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('SEQUENCE', {
      header: 'Sequence',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('ARR_DAY', {
      header: 'Arrival Day',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
    columnHelper.accessor('ARR_TIME', {
      header: 'Arrival Time',
      cell: ({ getValue }) => <span>{getValue() || ''}</span>,
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: RouteAssignmentRecord,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <React.Fragment>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="card-primary">
            <Card.Header>
              <div className="d-flex justify-content-between mb-2">
                <h4 className="card-title">Assigned Orders List</h4>
                <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                  {'Back'}
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="pt-0">
              <Table useReactTableReturn={useReactTableReturn} />
              <Pagination />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssignedOrdersList;

const RouteAssignmentRecord = [
  {
    Id: 57950,
    OrderId: 'bdeb6846-b164-4724-bb42-8a22038aab14',
    CUST_NAME: 'Leyton',
    ADDRESS_1: 'Unit 1 Dorma Trading Park',
    ROUTENAME: 'Run-0004',
    SEQUENCE: '1',
    ARR_DAY: 'Mon',
    ARR_TIME: '03:00',
  },
  {
    Id: 57951,
    OrderId: 'c71a625b-35cb-4833-951f-17535fd7dc1a',
    CUST_NAME: 'Jubilee Place AM and PM delivery',
    ADDRESS_1: 'Jubilee Place',
    ROUTENAME: 'Run-0004',
    SEQUENCE: '2',
    ARR_DAY: 'Mon',
    ARR_TIME: '03:55',
  },
  {
    Id: 57952,
    OrderId: '0e576c74-b0e3-48ed-a7e7-2786d7d44140',
    CUST_NAME: 'More London AM Delivery',
    ADDRESS_1: 'Unit B, 6 More London, London',
    ROUTENAME: 'Run-0004',
    SEQUENCE: '3',
    ARR_DAY: 'Mon',
    ARR_TIME: '05:15',
  },
  {
    Id: 57953,
    OrderId: '37372839-0cc4-40bd-9911-c952f8fcb28c',
    CUST_NAME: 'Leyton',
    ADDRESS_1: 'Unit 1 Dorma Trading Park',
    ROUTENAME: 'Run-0004',
    SEQUENCE: '4',
    ARR_DAY: 'Mon',
    ARR_TIME: '06:10',
  },
];
