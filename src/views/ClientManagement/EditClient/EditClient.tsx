import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateClientMutation } from '@/infrastructure/store/api/client/client-api';
import { UpdateClientRequest } from '@/infrastructure/store/api/client/client-types';
import { HandleNotification } from '@/components/Toast';
import EditClientForm from './EditClientForm';

const EditClient = () => {
  const navigate = useNavigate();
  useLocation();
  const [updateClient, updateClientState] = useUpdateClientMutation();
  const onSubmitClient: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateClient(e as UpdateClientRequest).unwrap();
    if (res.success === true) {
      navigate('/client-management', { replace: true });
      HandleNotification(res.message || 'Client updated successfully.', res.success);
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Client</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <EditClientForm onSubmit={onSubmitClient} loadingState={updateClientState.isLoading} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditClient;
