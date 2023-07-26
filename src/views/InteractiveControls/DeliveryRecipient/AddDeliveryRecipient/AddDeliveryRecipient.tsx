import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import AddDeliveryRecipientForm from './AddDeliveryRecipientForm';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDeliveryRecipientResolver } from 'src/form-resolver/delivery-recipient/delivery-recipient-resolver';
import { useSaveDeliveryRecipientMutation } from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-api';
import { HandleNotification } from '@/components/Toast';
import { DeliveryRecipientRequest } from '@/infrastructure/store/api/delivery-recipient/delivery-recipient-types';

const AddDeliveryRecipient = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addDeliveryRecipientResolver),
  });
  const navigate = useNavigate();

  const { data: clientsList } = useClientListQuery(null);

  const [saveDeliveryRecipient, saveDeliveryRecipientState] = useSaveDeliveryRecipientMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveDeliveryRecipient(data as DeliveryRecipientRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/delivery-recipient-list', { replace: true });
      HandleNotification(res.message || 'Delivery recipient added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Delivery Recipient</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddDeliveryRecipientForm
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveDeliveryRecipientState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddDeliveryRecipient;
