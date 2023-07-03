import Breadcrumb from '@/components/Breadcrumb';
import { Col, Row } from 'react-bootstrap';
import OrderStatusList from './OrderStatusList/OrderStatusList';

const OrderStatusManagement = () => {
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb breadcrumbTitle="Order Status Management" />
      </Col>
      <OrderStatusList />
    </Row>
  );
};

export default OrderStatusManagement;
