import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import EditCustomerMailForm from './EditCustomerMailForm';
import {
  useCustomerMailshotByIdQuery,
  useUpdateCustomerMailshotMutation,
} from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-api';
import { UpdateCustomerMailshotRequest } from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCustomerMailResolver } from 'src/form-resolver/interactive-control/cutomer-mail/cutomer-mail-resolver';

const EditCustomerMail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: customerMailshot, isLoading: IsCustomerMailshotLoading } = useCustomerMailshotByIdQuery(
    location.state.mailshotId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(addCustomerMailResolver),
    defaultValues: customerMailshot?.data,
  });

  const [updateCustomerMailshot, updateCustomerMailshotState] = useUpdateCustomerMailshotMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateCustomerMailshot(data as UpdateCustomerMailshotRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-mailshot-list', { replace: true });
      HandleNotification(res.message || 'Customer mailshot updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (customerMailshot) {
      useFormReturn.reset(customerMailshot.data);
    }
  }, [customerMailshot, useFormReturn]);

  const loading = IsCustomerMailshotLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Customer Mail</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditCustomerMailForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateCustomerMailshotState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditCustomerMail;
