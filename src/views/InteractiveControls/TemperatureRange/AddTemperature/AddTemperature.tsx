import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import AddTemperatureForm from './AddTemperatureForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTemperatureRangeResolver } from 'src/form-resolver/temperature-range/temperature-range-resolver';
import { useSaveTemperatureRangeMutation } from '@/infrastructure/store/api/temperature-range/temperature-range-api';
import { TemperatureRangeRequest } from '@/infrastructure/store/api/temperature-range/temperature-range-types';
import { HandleNotification } from '@/components/Toast';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';

const AddTemperature = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addTemperatureRangeResolver),
  });
  const navigate = useNavigate();

  const { data: clientsList } = useClientListQuery(null);

  const [saveTemperatureRange, saveTemperatureRangeState] = useSaveTemperatureRangeMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveTemperatureRange(data as TemperatureRangeRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/temperature-range-list', { replace: true });
      HandleNotification(res.message || 'Temperature range added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Temperature Range</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddTemperatureForm
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveTemperatureRangeState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddTemperature;
