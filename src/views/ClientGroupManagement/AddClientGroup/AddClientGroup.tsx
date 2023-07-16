import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import AddClientGroupForm from './AddClientGroupForm';
import { useSaveClientGroupMutation } from '@/infrastructure/store/api/client-group/client-group-api';
import { HandleNotification } from '@/components/Toast';
import { CreateClientGroupRequest } from '@/infrastructure/store/api/client-group/client-group-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDriverResolver } from 'src/form-resolver/driver/driver-resolver';

const AddClientGroup = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addDriverResolver),
  });
  const navigate = useNavigate();
  const [saveClientGroup, saveClientGroupState] = useSaveClientGroupMutation();
  const onSubmitClientGroup: SubmitHandler<FieldValues> = async (e) => {
    const res = await saveClientGroup(e as CreateClientGroupRequest).unwrap();
    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }
    if (res.success === true) {
      navigate('/client-group-management', { replace: true });
      HandleNotification(res.message || 'Client group added successfully.', res.success);
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
              <h4 className="card-title">Add Client Group</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddClientGroupForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitClientGroup}
              loadingState={saveClientGroupState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddClientGroup;
