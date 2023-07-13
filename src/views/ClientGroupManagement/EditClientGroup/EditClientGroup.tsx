import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateClientGroupMutation } from '@/infrastructure/store/api/client-group/client-group-api';
import { HandleNotification } from '@/components/Toast';
import { UpdateClientGroupRequest } from '@/infrastructure/store/api/client-group/client-group-types';
import EditClientGroupForm from './EditClientGroupForm';

const EditClientGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateClientGroup, updateClientGroupState] = useUpdateClientGroupMutation();
  const onSubmitClientGroup: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateClientGroup(e as UpdateClientGroupRequest).unwrap();
    if (res.success === true) {
      navigate('/client-group-management', { replace: true });
      HandleNotification(res.message || 'Client group updated successfully.', res.success);
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
              <h4 className="card-title">Edit Client Group</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <EditClientGroupForm
              onSubmit={onSubmitClientGroup}
              clientGroup={location.state.clientGroup}
              loadingState={updateClientGroupState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditClientGroup;
