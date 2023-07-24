import { Row, Col, Card } from 'react-bootstrap';
import RouteForm from './RouteForm';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSaveRouteMutation } from '@/infrastructure/store/api/route/route-api';
import { HandleNotification } from '@/components/Toast';
import { CreateRouteRequest } from '@/infrastructure/store/api/route/route-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRouteResolver } from 'src/form-resolver/route/route-resolver';

const AddRoute = () => {
  const navigate = useNavigate();
  const useFormReturn = useForm({
    resolver: yupResolver(addRouteResolver),
  });
  const [saveRoute, saveRouteState] = useSaveRouteMutation();
  const onSubmitRoute: SubmitHandler<FieldValues> = async (e) => {
    const res = await saveRoute({
      ...e,
      routeStartDate: new Date(e.routeStartDate),
      routeEndDate: new Date(e.routeEndDate),
    } as CreateRouteRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/route-list', { replace: true });
      HandleNotification(res.message || 'Route added successfully.', res.success);
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
              <h4 className="card-title">Add Route</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <RouteForm useFormReturn={useFormReturn} onSubmit={onSubmitRoute} loadingState={saveRouteState.isLoading} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddRoute;
