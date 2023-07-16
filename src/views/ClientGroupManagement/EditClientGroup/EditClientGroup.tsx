import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useClientGroupByIdQuery,
  useUpdateClientGroupMutation,
} from '@/infrastructure/store/api/client-group/client-group-api';
import { HandleNotification } from '@/components/Toast';
import { UpdateClientGroupRequest } from '@/infrastructure/store/api/client-group/client-group-types';
import EditClientGroupForm from './EditClientGroupForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { editClientGroupResolver } from 'src/form-resolver/client/client-resolver';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';

const EditClientGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: clientGroup, isLoading: IsClientGroupLoading } = useClientGroupByIdQuery(
    location.state.clientGroupId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(editClientGroupResolver),
    defaultValues: { ...clientGroup?.data, clientGroupName: clientGroup?.data?.name },
  });
  const [updateClientGroup, updateClientGroupState] = useUpdateClientGroupMutation();
  const onSubmitClientGroup: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateClientGroup(e as UpdateClientGroupRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/client-group-management', { replace: true });
      HandleNotification(res.message || 'Client group updated successfully.', res.success);
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (clientGroup) {
      useFormReturn.reset({ ...clientGroup?.data, clientGroupName: clientGroup?.data?.name });
    }
  }, [clientGroup, useFormReturn]);

  const loading = IsClientGroupLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Client Group</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditClientGroupForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitClientGroup}
                loadingState={updateClientGroupState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditClientGroup;
