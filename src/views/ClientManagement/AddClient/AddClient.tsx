import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import ClientForm from './ClientForm';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSaveClientMutation } from '@/infrastructure/store/api/client/client-api';
import { CreateClientRequest } from '@/infrastructure/store/api/client/client-types';
import { HandleNotification } from '@/components/Toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { addClientResolver } from 'src/form-resolver/client/client-resolver';

const AddClient = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addClientResolver),
  });
  const navigate = useNavigate();
  const [saveClient, saveClientState] = useSaveClientMutation();
  const onSubmitClient: SubmitHandler<FieldValues> = async (e) => {
    const res = await saveClient(e as CreateClientRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/client-management', { replace: true });
      HandleNotification(res.message || 'Client added successfully.', res.success);
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
              <h4 className="card-title">Add Client</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <ClientForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitClient}
              loadingState={saveClientState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddClient;
