import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useOrderByIdQuery } from '@/infrastructure/store/api/order/order-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: viewOrderStatus, isLoading: IsViewOrderStatusLoading } = useOrderByIdQuery(
    location.state.orderId ?? skipToken,
  );

  const loading = IsViewOrderStatusLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">View Order</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <table cellPadding="15">
                <tbody>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">uniqueReferenceCode:</td>
                    <td>{viewOrderStatus?.data.uniqueReferenceCode}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Order Name:</td>
                    <td>{viewOrderStatus?.data.orderName}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Customer Name:</td>
                    <td>{viewOrderStatus?.data.customerName}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Customer Email:</td>
                    <td>{viewOrderStatus?.data.customerEmail}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Customer Mobile:</td>
                    <td>{viewOrderStatus?.data.customerMobile}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Town/City:</td>
                    <td>{viewOrderStatus?.data.townCity}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Post Code:</td>
                    <td>{viewOrderStatus?.data.postCode}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Country:</td>
                    <td>{viewOrderStatus?.data.country}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Order Window Open:</td>
                    <td>{viewOrderStatus?.data.orderWindowOpen}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Order Window Close:</td>
                    <td>{viewOrderStatus?.data.orderWindowClose}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Type Of Order:</td>
                    <td>{viewOrderStatus?.data.typeOfOrder}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Loading Depot/Unit:</td>
                    <td>{viewOrderStatus?.data.loadingUnit}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Product Weight (Kg):</td>
                    <td>{viewOrderStatus?.data.productWeight}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Vehicle Type:</td>
                    <td>{viewOrderStatus?.data.vehicleType}</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Address:</td>
                    <td>{viewOrderStatus?.data.address}</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Driver Delivery Instruction:</td>
                    <td>{viewOrderStatus?.data.driverDeliveryInstruction}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewOrder;
