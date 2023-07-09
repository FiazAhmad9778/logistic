import { Card, Col, Form, Row } from 'react-bootstrap';
import OrderList from './OrderList/OrderList';

const OrderManagement = () => {
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-start mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <OrderList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderManagement;
