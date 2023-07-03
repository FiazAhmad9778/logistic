import Breadcrumb from '@/components/Breadcrumb';
import { Col, Row } from 'react-bootstrap';
import OrderList from './OrderList/OrderList';

const OrderManagement = () => {
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb breadcrumbTitle="Order Management" />
      </Col>
      <OrderList />
    </Row>
  );
};

export default OrderManagement;
