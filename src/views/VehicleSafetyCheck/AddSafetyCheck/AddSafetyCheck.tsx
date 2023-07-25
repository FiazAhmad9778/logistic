import { Row, Col, Card } from 'react-bootstrap';
import SafetyCheckForm from './SafetyCheckForm';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSaveSafetyCheckMutation } from '@/infrastructure/store/api/safety-check/safety-check-api';
import { CreateSafetyCheckRequest } from '@/infrastructure/store/api/safety-check/safety-check-types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HandleNotification } from '@/components/Toast';
import { addSafetyCheckResolver } from 'src/form-resolver/safety-check/safety-check-resolver';
import { yupResolver } from '@hookform/resolvers/yup';

const AddSafetyCheck = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addSafetyCheckResolver),
  });
  const navigate = useNavigate();

  const [saveSafetyCheck, saveSafetyCheckState] = useSaveSafetyCheckMutation();
  const onSubmitSafetyCheck: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveSafetyCheck(data as CreateSafetyCheckRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/vehicle-safety-check-list', { replace: true });
      HandleNotification(res.message || 'Safety check added successfully.', res.success);
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
              <h4 className="card-title">Add Safety Check</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <SafetyCheckForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitSafetyCheck}
              loadingState={saveSafetyCheckState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSafetyCheck;
