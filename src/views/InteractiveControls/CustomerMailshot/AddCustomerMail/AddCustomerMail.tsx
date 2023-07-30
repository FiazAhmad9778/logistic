import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import AddCustomerMailForm from './AddCustomerMailForm';
import { useSaveCustomerMailshotMutation } from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-api';
import { CreateCustomerMailshotRequest } from '@/infrastructure/store/api/customer-mailshot/customer-mailshot-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCustomerMailResolver } from 'src/form-resolver/interactive-control/cutomer-mail/cutomer-mail-resolver';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';

const AddCustomerMail = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addCustomerMailResolver),
  });
  const navigate = useNavigate();

  const { data: clientsList } = useClientListQuery(null);
  const [saveCustomerMailshot, saveCustomerMailshotState] = useSaveCustomerMailshotMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveCustomerMailshot(data as CreateCustomerMailshotRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-mailshot-list', { replace: true });
      HandleNotification(res.message || 'Customer mailshot added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Customer Mail</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddCustomerMailForm
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveCustomerMailshotState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddCustomerMail;
