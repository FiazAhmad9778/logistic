import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import EditDriverForm from './EditDriverForm';
import { useDriverByIdQuery, useUpdateDriverMutation } from '@/infrastructure/store/api/driver/driver-api';
import { UpdateDriverRequest } from '@/infrastructure/store/api/driver/driver-types';
import { HandleNotification } from '@/components/Toast';
import { editDriverResolver } from 'src/form-resolver/driver/driver-resolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { ValidationError } from 'src/types/common/http-types';

const EditDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: driver, isLoading: IsDriverLoading } = useDriverByIdQuery(location.state.driverId ?? skipToken);
  const useFormReturn = useForm({
    resolver: yupResolver(editDriverResolver),
    defaultValues: driver?.data,
  });
  const [updateDriver, updateDriverState] = useUpdateDriverMutation();
  const onSubmitDriver: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateDriver(e as UpdateDriverRequest).unwrap();
    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error: ValidationError) =>
        useFormReturn.setError(error?.name as never, { message: error.message }),
      );
    }

    if (res.success === true) {
      navigate('/driver-management', { replace: true });
      HandleNotification(res.message || 'Driver updated successfully.', res.success);
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (driver) {
      useFormReturn.reset(driver.data);
    }
  }, [driver, useFormReturn]);

  const loading = IsDriverLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Driver</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditDriverForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitDriver}
                loadingState={updateDriverState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditDriver;
