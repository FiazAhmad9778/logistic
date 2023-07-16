import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import EditDriverForm from './EditDriverForm';
import { useUpdateDriverMutation } from '@/infrastructure/store/api/driver/driver-api';
import { UpdateDriverRequest } from '@/infrastructure/store/api/driver/driver-types';
import { HandleNotification } from '@/components/Toast';

const EditDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateDriver, updateDriverState] = useUpdateDriverMutation();
  const onSubmitDriver: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateDriver(e as UpdateDriverRequest).unwrap();
    if (res.success === true) {
      navigate('/driver-management', { replace: true });
      HandleNotification(res.message || 'Driver updated successfully.', res.success);
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };
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
            <EditDriverForm
              onSubmit={onSubmitDriver}
              driver={location?.state?.driver}
              loadingState={updateDriverState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditDriver;
