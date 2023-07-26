import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import EditDeliveryRecipientForm from './EditDeliveryRecipientForm';
import {
  useDeliveryRecipientByIdQuery,
  useUpdateDeliveryRecipientMutation,
} from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { yupResolver } from '@hookform/resolvers/yup';
import { editDeliveryRecipientResolver } from 'src/form-resolver/delivery-recipient/delivery-recipient-resolver';
import { useEffect } from 'react';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { DeliveryRecipientRequest } from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-types';

const EditDeliveryRecipient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: deliveryRecipient, isLoading: IsDeliveryRecipientLoading } = useDeliveryRecipientByIdQuery(
    location.state.recipientId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(editDeliveryRecipientResolver),
    defaultValues: deliveryRecipient?.data,
  });

  const { data: clientsList } = useClientListQuery(null);

  const [updateDeliveryRecipient, updateDeliveryRecipientState] = useUpdateDeliveryRecipientMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateDeliveryRecipient(data as DeliveryRecipientRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/delivery-recipient-list', { replace: true });
      HandleNotification(res.message || 'Delivery recipient updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (deliveryRecipient) {
      useFormReturn.reset(deliveryRecipient.data);
    }
  }, [deliveryRecipient, useFormReturn]);

  const loading = IsDeliveryRecipientLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Delivery Recipient</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditDeliveryRecipientForm
                clients={clientsList?.data}
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateDeliveryRecipientState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditDeliveryRecipient;
