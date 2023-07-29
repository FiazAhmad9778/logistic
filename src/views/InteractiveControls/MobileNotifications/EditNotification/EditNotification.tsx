import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import EditNotificationForm from './EditNotificationForm';
import {
  useMobileNotificationByIdQuery,
  useUpdateMobileNotificationMutation,
} from '@/infrastructure/store/api/mobile-notification/mobile-notification-api';
import { UpdateMobileNotificationRequest } from '@/infrastructure/store/api/mobile-notification/mobile-notification-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNotificationResolver } from 'src/form-resolver/interactive-control/mobile-notification/mobile-notification-resolver';

const EditNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: MobileNotification, isLoading: IsMobileNotificationLoading } = useMobileNotificationByIdQuery(
    location.state.notificationId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(addNotificationResolver),
    defaultValues: MobileNotification?.data,
  });

  const [updateMobileNotification, updateMobileNotificationState] = useUpdateMobileNotificationMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateMobileNotification(data as UpdateMobileNotificationRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/mobile-app-notification-list', { replace: true });
      HandleNotification(res.message || 'Notification updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (MobileNotification) {
      useFormReturn.reset(MobileNotification.data);
    }
  }, [MobileNotification, useFormReturn]);

  const loading = IsMobileNotificationLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Mobile Notification</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditNotificationForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateMobileNotificationState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditNotification;
