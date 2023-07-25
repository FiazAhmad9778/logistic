import { Row, Col, Card } from 'react-bootstrap';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useSafetyCheckByIdQuery,
  useUpdateSafetyCheckMutation,
} from '@/infrastructure/store/api/safety-check/safety-check-api';
import { UpdateSafetyCheckRequest } from '@/infrastructure/store/api/safety-check/safety-check-types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HandleNotification } from '@/components/Toast';
import EditSafetyCheckForm from './EditSafetyCheckForm';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import Loader from '@/components/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSafetyCheckResolver } from 'src/form-resolver/safety-check/safety-check-resolver';

const EditSafetyCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: safetyCheck, isLoading: IsSafetyCheckLoading } = useSafetyCheckByIdQuery(
    location?.state?.safetyCheckId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(addSafetyCheckResolver),
    defaultValues: safetyCheck?.data,
  });

  const [updateSafetyCheck, updateSafetyCheckState] = useUpdateSafetyCheckMutation();
  const onSubmitSafetyCheck: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateSafetyCheck(data as UpdateSafetyCheckRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/vehicle-safety-check-list', { replace: true });
      HandleNotification(res.message || 'Safety check update successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (safetyCheck?.data) {
      useFormReturn.reset(safetyCheck.data);
    }
  }, [safetyCheck, useFormReturn]);

  const loading = IsSafetyCheckLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Safety Check</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditSafetyCheckForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitSafetyCheck}
                loadingState={updateSafetyCheckState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditSafetyCheck;
