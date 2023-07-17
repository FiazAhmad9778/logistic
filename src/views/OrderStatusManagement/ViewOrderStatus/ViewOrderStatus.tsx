import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useViewOrderStatusQuery } from '@/infrastructure/store/api/order-status/order-status-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewOrderStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: viewOrderStatus, isLoading: IsViewOrderStatusLoading } = useViewOrderStatusQuery(
    location.state.orderStatusId ?? skipToken,
  );
  console.log(viewOrderStatus);

  const loading = IsViewOrderStatusLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">View Order Status</h4>
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
                    <td className="tx-12 tx-gray-600 tx-medium">Customer Name:</td>
                    <td>Leyton</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Customer Address:</td>
                    <td>Unit 1 Dorma Trading Park Staffa Road</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Email:</td>
                    <td>Leyton</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Phone No.:</td>
                    <td>Unit 1 Dorma Trading Park Staffa Road</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Driver Name:</td>
                    <td>Ibrahim</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Route Name:</td>
                    <td>Run-0012</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Delivery Recipient:</td>
                    <td>-</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Type Of Order:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Driver Performance:</td>
                    <td>-</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Driver Review:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Ambient:</td>
                    <td>-</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Chilled:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Frozen:</td>
                    <td>-</td>
                    <td className="tx-12 tx-gray-600 tx-medium">Hot:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Any Item Missing:</td>
                    <td>No</td>
                    <td className="tx-12 tx-gray-600 tx-medium"></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Trollies Delivered:</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="tx-12 tx-gray-600 tx-medium">Order Name:</td>
                    <td>-</td>
                    <td className="tx-12 tx-gray-600 tx-medium">{"Collection Person's Name:"}</td>
                    <td>-</td>
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

export default ViewOrderStatus;
