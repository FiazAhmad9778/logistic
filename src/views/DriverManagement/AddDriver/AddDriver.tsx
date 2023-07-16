import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DriverForm from './DriverForm';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSaveDriverMutation } from '@/infrastructure/store/api/driver/driver-api';
import { CreateDriverRequest } from '@/infrastructure/store/api/driver/driver-types';
import { HandleNotification } from '@/components/Toast';
import { addDriverResolver } from 'src/form-resolver/driver/driver-resolver';
import { yupResolver } from '@hookform/resolvers/yup';

const AddDriver = () => {
  const useFormReturn = useForm<CreateDriverRequest>({
    resolver: yupResolver(addDriverResolver),
  });
  const navigate = useNavigate();
  const [saveDriver, saveDriverState] = useSaveDriverMutation();

  const onSubmitDriver: SubmitHandler<FieldValues> = async (data) => {
    delete data['profile'];
    const res = await saveDriver(data as CreateDriverRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }
    if (res.success === true) {
      navigate('/driver-management', { replace: true });
      HandleNotification(res.message || 'Driver added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Driver</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <DriverForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitDriver}
              loadingState={saveDriverState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddDriver;
