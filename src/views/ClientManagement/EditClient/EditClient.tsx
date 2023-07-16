import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClientByIdQuery, useUpdateClientMutation } from '@/infrastructure/store/api/client/client-api';
import { UpdateClientRequest } from '@/infrastructure/store/api/client/client-types';
import { HandleNotification } from '@/components/Toast';
import EditClientForm from './EditClientForm';
import { editClientResolver } from 'src/form-resolver/client/client-resolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';

const EditClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: client, isLoading: IsClientLoading } = useClientByIdQuery(location.state.clientId ?? skipToken);
  const useFormReturn = useForm({
    resolver: yupResolver(editClientResolver),
    defaultValues: { ...client?.data, clientName: client?.data.name },
  });
  const [updateClient, updateClientState] = useUpdateClientMutation();
  const onSubmitClient: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateClient(e as UpdateClientRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/client-management', { replace: true });
      HandleNotification(res.message || 'Client updated successfully.', res.success);
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (client) {
      useFormReturn.reset({ ...client.data, clientName: client?.data?.name });
    }
  }, [client, useFormReturn]);

  const loading = IsClientLoading;
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
            {loading ? (
              <Loader />
            ) : (
              <EditClientForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitClient}
                loadingState={updateClientState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditClient;
