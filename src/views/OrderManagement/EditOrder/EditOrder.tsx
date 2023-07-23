import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import EditOrderForm from './EditOrderForm';
import { useOrderByIdQuery, useUpdateOrderMutation } from '@/infrastructure/store/api/order/order-api';
import { UpdateOrderRequest } from '@/infrastructure/store/api/order/order-types';
import { HandleNotification } from '@/components/Toast';
import { useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrderResolver } from 'src/form-resolver/order/order-resolver';

const EditOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: order, isLoading: IsOrderLoading } = useOrderByIdQuery(location.state.orderId ?? skipToken);
  const useFormReturn = useForm({
    defaultValues: order?.data,
    resolver: yupResolver(addOrderResolver),
  });

  const { data: routeList } = useRouteListQuery(null);
  const { data: clientList } = useClientListQuery(null);
  const [updateOrder, updateOrderState] = useUpdateOrderMutation();
  const onSubmitOrder: SubmitHandler<FieldValues> = async (order) => {
    const res = await updateOrder(order as UpdateOrderRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/order-management-list', { replace: true });
      HandleNotification(res.message || 'Order updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (order) {
      useFormReturn.reset(order.data);
    }
  }, [order, useFormReturn]);

  const loading = IsOrderLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Order</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditOrderForm
                routes={routeList?.data}
                clients={clientList?.data}
                useFormReturn={useFormReturn}
                onSubmit={onSubmitOrder}
                loadingState={updateOrderState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditOrder;
