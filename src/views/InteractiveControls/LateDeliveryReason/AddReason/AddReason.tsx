import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import AddReasonForm from './AddReasonForm';
import { useSaveOrderLateReasonMutation } from '@/infrastructure/store/api/order-late-reason/order-late-reason-api';
import { CreateLateReasonRequest } from '@/infrastructure/store/api/order-late-reason/order-late-reason-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addReasonResolver } from 'src/form-resolver/interactive-control/late-reason/late-reason-resolver';

const AddReason = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addReasonResolver),
  });
  const navigate = useNavigate();

  const [saveLateReason, saveLateReasonState] = useSaveOrderLateReasonMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveLateReason(data as CreateLateReasonRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/late-delivery-reason-list', { replace: true });
      HandleNotification(res.message || 'Delivery late reason added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Reason for Late Delivery</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddReasonForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveLateReasonState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddReason;
