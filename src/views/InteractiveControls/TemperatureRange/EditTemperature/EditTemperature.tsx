import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import EditTemperatureForm from './EditTemperatureForm';
import {
  useTemperatureRangeByIdQuery,
  useUpdateTemperatureRangeMutation,
} from '@/infrastructure/store/api/temperature-range/temperature-range-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { editTemperatureRangeResolver } from 'src/form-resolver/temperature-range/temperature-range-resolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { TemperatureRangeRequest } from '@/infrastructure/store/api/temperature-range/temperature-range-types';
import { HandleNotification } from '@/components/Toast';
import { useEffect } from 'react';
import Loader from '@/components/Loader';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { ValidationError } from 'src/types/common/http-types';

const EditTemperature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: temperatureRange, isLoading: IsTemperatureRangeLoading } = useTemperatureRangeByIdQuery(
    location.state.rangeId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(editTemperatureRangeResolver),
    defaultValues: temperatureRange?.data,
  });

  const { data: clientsList } = useClientListQuery(null);

  const [updateTemperatureRange, updateTemperatureRangeState] = useUpdateTemperatureRangeMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateTemperatureRange(data as TemperatureRangeRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error: ValidationError) =>
        useFormReturn.setError(error?.name as never, { message: error.message }),
      );
    }

    if (res.success === true) {
      navigate('/temperature-range-list', { replace: true });
      HandleNotification(res.message || 'Temperature range updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (temperatureRange) {
      useFormReturn.reset(temperatureRange.data);
    }
  }, [temperatureRange, useFormReturn]);

  const loading = IsTemperatureRangeLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Temperature Range </h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditTemperatureForm
                clients={clientsList?.data}
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateTemperatureRangeState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditTemperature;
