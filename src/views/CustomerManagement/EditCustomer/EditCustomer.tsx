import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomerByIdQuery, useUpdateCustomerMutation } from '@/infrastructure/store/api/customer/customer-api';
import { HandleNotification } from '@/components/Toast';
import EditCustomerForm from './EditCustomerForm';
import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { UpdateCustomerRequest } from '@/infrastructure/store/api/customer/customer-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCustomerResolver } from 'src/form-resolver/customer/customer-resolver';

const EditCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: customer, isLoading: IsCustomerLoading } = useCustomerByIdQuery(location.state.emailId ?? skipToken);
  const useFormReturn = useForm({
    resolver: yupResolver(addCustomerResolver),
    defaultValues: customer?.data,
  });

  const [updateCustomer, updateCustomerState] = useUpdateCustomerMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateCustomer(data as UpdateCustomerRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-management/', { replace: true });
      HandleNotification(res.message || 'Customer updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (customer) {
      useFormReturn.reset(customer.data);
    }
  }, [customer, useFormReturn]);

  const loading = IsCustomerLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Customer</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditCustomerForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateCustomerState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditCustomer;
