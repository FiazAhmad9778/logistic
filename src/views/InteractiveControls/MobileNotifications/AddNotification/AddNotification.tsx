import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import AddNotificationForm from './AddNotificationForm';
import { useSaveMobileNotificationMutation } from '@/infrastructure/store/api/mobile-notification/mobile-notification-api';
import { CreateMobileNotificationRequest } from '@/infrastructure/store/api/mobile-notification/mobile-notification-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNotificationResolver } from 'src/form-resolver/interactive-control/mobile-notification/mobile-notification-resolver';

const AddNotification = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addNotificationResolver),
  });
  const navigate = useNavigate();

  const [saveMobileNotification, saveMobileNotificationState] = useSaveMobileNotificationMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveMobileNotification(data as CreateMobileNotificationRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/mobile-app-notification-list', { replace: true });
      HandleNotification(res.message || 'Notification added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Mobile Notification</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddNotificationForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveMobileNotificationState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNotification;
