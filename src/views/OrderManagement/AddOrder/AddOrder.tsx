import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm, UseFormGetValues } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import AddOrderForm from './AddOrderForm';
import { useSaveOrderMutation } from '@/infrastructure/store/api/order/order-api';
import { CreateOrderRequest, OrderResponse } from '@/infrastructure/store/api/order/order-types';
import { HandleNotification } from '@/components/Toast';
import { useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrderResolver } from 'src/form-resolver/order/order-resolver';
import { Feature } from '@/infrastructure/store/api/mapbox/mapbox-types';
import { useRef, useState } from 'react';
import { MapRef } from 'react-map-gl';

const AddOrder = () => {
  const navigate = useNavigate();
  const useFormReturn = useForm({
    resolver: yupResolver(addOrderResolver),
  });

  const { data: routeList } = useRouteListQuery(null);
  const { data: clientList } = useClientListQuery(null);
  const [saveOrder, saveOrderState] = useSaveOrderMutation();

  const mapRef = useRef<MapRef>(null);
  const [locationData, setLocationData] = useState<OrderResponse | CreateOrderRequest | undefined>();

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

  const handleSelectAddress = (data: Feature, getValues: UseFormGetValues<CreateOrderRequest>) => {
    const location = data && (data.center || (data.geometry?.type === 'Point' && data.geometry.coordinates));
    if (getValues())
      setLocationData({ ...getValues(), address1: data.place_name, latitude: location[1], longitude: location[0] });
    mapRef.current?.flyTo({
      center: [location[0], location[1]],
      zoom: 7,
      speed: 1.3,
    });
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
              initialValue={locationData}
              routes={routeList?.data}
              clients={clientList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmitOrder}
              loadingState={saveOrderState.isLoading}
              handleSelectAddress={handleSelectAddress}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddOrder;
