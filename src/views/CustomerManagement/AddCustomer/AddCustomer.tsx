import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSaveCustomerMutation } from '@/infrastructure/store/api/customer/customer-api';
import { HandleNotification } from '@/components/Toast';
import AddCustomerForm from './CustomerForm';
import { CreateCustomerRequest } from '@/infrastructure/store/api/customer/customer-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCustomerResolver } from 'src/form-resolver/customer/customer-resolver';

const AddCustomer = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addCustomerResolver),
  });
  const navigate = useNavigate();

  const [saveCustomer, saveCustomerState] = useSaveCustomerMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveCustomer(data as CreateCustomerRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-management/', { replace: true });
      HandleNotification(res.message || 'Customer added successfully.', res.success);
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
              <h4 className="card-title">Add Customer</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddCustomerForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveCustomerState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddCustomer;
