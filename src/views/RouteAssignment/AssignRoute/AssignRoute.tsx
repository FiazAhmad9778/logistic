import { Row, Col, Card } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSaveRouteAssignmentMutation } from '@/infrastructure/store/api/route-assignment/route-assignment';
import { CreateRouteAssignmentRequest } from '@/infrastructure/store/api/route-assignment/route-assignment-types';
import { HandleNotification } from '@/components/Toast';
import AssignRouteForm from './AssignRouteForm';
import { addRouteAssignmentResolver } from 'src/form-resolver/route/route-resolver';
import { yupResolver } from '@hookform/resolvers/yup';

const AssignRoute = () => {
  const navigate = useNavigate();
  const useFormReturn = useForm({
    resolver: yupResolver(addRouteAssignmentResolver),
  });
  const [saveRouteAssignment, saveRouteAssignmentState] = useSaveRouteAssignmentMutation();
  const onSubmitAssignRoute: SubmitHandler<FieldValues> = async (e) => {
    const res = await saveRouteAssignment(e as CreateRouteAssignmentRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/route-assignment-list/', { replace: true });
      HandleNotification(res.message || 'Route assignment added successfully.', res.success);
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
              <h4 className="card-title">Assign Route</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AssignRouteForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitAssignRoute}
              loadingState={saveRouteAssignmentState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AssignRoute;
