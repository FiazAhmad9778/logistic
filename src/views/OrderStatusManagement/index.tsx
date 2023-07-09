import { Card, Col, Row, Form } from 'react-bootstrap';
import OrderStatusList from './OrderStatusList/OrderStatusList';

const OrderStatusManagement = () => {
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
            <OrderStatusList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderStatusManagement;
