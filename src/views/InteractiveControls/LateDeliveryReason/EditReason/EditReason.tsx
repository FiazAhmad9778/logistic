import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import EditReasonForm from './EditReasonForm';
import {
  useOrderLateReasonByIdQuery,
  useUpdateOrderLateReasonMutation,
} from '@/infrastructure/store/api/order-late-reason/order-late-reason-api';
import { UpdateLateReasonRequest } from '@/infrastructure/store/api/order-late-reason/order-late-reason-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addReasonResolver } from 'src/form-resolver/interactive-control/late-reason/late-reason-resolver';

const EditReason = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: lateReason, isLoading: IsLateReasonLoading } = useOrderLateReasonByIdQuery(
    location.state.reasonId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(addReasonResolver),
    defaultValues: lateReason?.data,
  });

  const [updateLateReason, updateLateReasonState] = useUpdateOrderLateReasonMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateLateReason(data as UpdateLateReasonRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/late-delivery-reason-list', { replace: true });
      HandleNotification(res.message || 'Delivery late reason updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (lateReason) {
      useFormReturn.reset(lateReason.data);
    }
  }, [lateReason, useFormReturn]);

  const loading = IsLateReasonLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Reason for Late Delivery</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditReasonForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateLateReasonState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditReason;
