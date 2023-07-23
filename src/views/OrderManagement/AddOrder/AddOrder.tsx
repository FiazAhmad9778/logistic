import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import AddOrderForm from './AddOrderForm';
import { useSaveOrderMutation } from '@/infrastructure/store/api/order/order-api';
import { CreateOrderRequest } from '@/infrastructure/store/api/order/order-types';
import { HandleNotification } from '@/components/Toast';
import { useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrderResolver } from 'src/form-resolver/order/order-resolver';

const AddOrder = () => {
  const navigate = useNavigate();
  const useFormReturn = useForm({
    resolver: yupResolver(addOrderResolver),
  });

  const { data: routeList } = useRouteListQuery(null);
  const { data: clientList } = useClientListQuery(null);
  const [saveOrder, saveOrderState] = useSaveOrderMutation();
  const onSubmitOrder: SubmitHandler<FieldValues> = async (order) => {
    const res = await saveOrder(order as CreateOrderRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/order-management-list', { replace: true });
      HandleNotification(res.message || 'Order added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Add Order</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddOrderForm
              routes={routeList?.data}
              clients={clientList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmitOrder}
              loadingState={saveOrderState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddOrder;
