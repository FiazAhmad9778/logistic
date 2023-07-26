import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import AddEmailForm from './AddEmailForm';
import { useSectionListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import { AutomatedEmailRequest } from '@/infrastructure/store/api/automated-email/automated-email-types';
import { useSaveAutomatedEmailMutation } from '@/infrastructure/store/api/automated-email/automated-email-api';
import { HandleNotification } from '@/components/Toast';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { addAutomatedEmailResolver } from 'src/form-resolver/automated-email/automated-email-resolver';

const AddEmail = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addAutomatedEmailResolver),
  });
  const navigate = useNavigate();

  const { data: sectionList } = useSectionListQuery(null);
  const { data: clientsList } = useClientListQuery(null);

  const [saveAutomatedEmail, saveAutomatedEmailState] = useSaveAutomatedEmailMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveAutomatedEmail(data as AutomatedEmailRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/automated-email-list', { replace: true });
      HandleNotification(res.message || 'Automated email added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Emails to which you want the mails to be sent</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddEmailForm
              sections={sectionList?.data}
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveAutomatedEmailState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddEmail;
