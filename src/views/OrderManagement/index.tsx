import { Card, Col, Row, Form } from 'react-bootstrap';
import OrderList from './OrderList/OrderList';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useDialogState } from '@/hooks/useDialogState';
import AssignRouteDialog from './AssignRouteDialog/AssignRouteDialog';

const OrderManagement = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { selectedOrderIds } = useAppSelector((state) => state['order']);
  const navigate = useNavigate();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <div className="d-flex gap-2">
                {selectedOrderIds.length > 0 && (
                  <Button
                    btnType="btn-outline-primary"
                    icon={<i className="fa fa fa-plus"></i>}
                    onClick={setOpenDialog}
                  >
                    {'Assign Route'}
                  </Button>
                )}
                <Button
                  btnType="btn-outline-primary"
                  icon={<i className="fa fa fa-plus"></i>}
                  onClick={() => navigate('/order-management-list/add-order')}
                >
                  {'New Order'}
                </Button>
              </div>
            </div>
            <AssignRouteDialog isOpen={isOpen} setCloseDialog={setCloseDialog} />
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
