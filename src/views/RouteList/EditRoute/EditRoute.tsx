import { Row, Col, Card } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRouteByIdQuery, useUpdateRouteMutation } from '@/infrastructure/store/api/route/route-api';
import { HandleNotification } from '@/components/Toast';
import { UpdateRouteRequest } from '@/infrastructure/store/api/route/route-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRouteResolver } from 'src/form-resolver/route/route-resolver';
import EditRouteForm from './EditRouteForm';
import Loader from '@/components/Loader';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { useDriversListQuery } from '@/infrastructure/store/api/driver/driver-api';

const EditRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: drivers } = useDriversListQuery(null);
  const { data: route, isLoading: IsRouteLoading } = useRouteByIdQuery(location.state.routeId ?? skipToken);
  const useFormReturn = useForm({
    resolver: yupResolver(addRouteResolver),
    defaultValues: {
      ...route?.data,
      routeStartDate: route?.data && getDateFormatMDY(route.data.routeStartDate),
      routeEndDate: route?.data && getDateFormatMDY(route.data.routeEndDate),
    },
  });
  const [updateRoute, updateRouteState] = useUpdateRouteMutation();
  const onSubmitRoute: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateRoute({
      ...e,
      routeStartDate: new Date(e.routeStartDate),
      routeEndDate: new Date(e.routeEndDate),
    } as UpdateRouteRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/route-list', { replace: true });
      HandleNotification(res.message || 'Route updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (route) {
      useFormReturn.reset({
        ...route.data,
        routeStartDate: route?.data && getDateFormatMDY(route.data.routeStartDate),
        routeEndDate: route?.data && getDateFormatMDY(route.data.routeEndDate),
      });
    }
  }, [route, useFormReturn]);

  const loading = IsRouteLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Route</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditRouteForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitRoute}
                loadingState={updateRouteState.isLoading}
                drivers={drivers?.data}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditRoute;
