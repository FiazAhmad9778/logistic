import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import EditEmailForm from './EditEmailForm';
import { editAutomatedEmailResolver } from 'src/form-resolver/automated-email/automated-email-resolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSectionListQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { useClientGroupsQuery } from '@/infrastructure/store/api/client-group/client-group-api';
import { HandleNotification } from '@/components/Toast';
import {
  useAutomatedEmailByIdQuery,
  useUpdateAutomatedEmailMutation,
} from '@/infrastructure/store/api/automated-email/automated-email-api';
import { AutomatedEmailRequest } from '@/infrastructure/store/api/automated-email/automated-email-types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';

const EditEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: automatedEmail, isLoading: IsAutomatedEmailLoading } = useAutomatedEmailByIdQuery(
    location.state.emailId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(editAutomatedEmailResolver),
    defaultValues: automatedEmail?.data,
  });

  const { data: sectionList } = useSectionListQuery(null);
  const { data: clientsList } = useClientListQuery(null);
  const { data: clientGroupList } = useClientGroupsQuery(null);

  const [updateAutomatedEmail, updateAutomatedEmailState] = useUpdateAutomatedEmailMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateAutomatedEmail(data as AutomatedEmailRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/automated-email-list', { replace: true });
      HandleNotification(res.message || 'Automated email updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (automatedEmail) {
      useFormReturn.reset(automatedEmail.data);
    }
  }, [automatedEmail, useFormReturn]);

  const loading = IsAutomatedEmailLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Emails to which you want the mails to be sent </h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditEmailForm
                sections={sectionList?.data}
                clients={clientsList?.data}
                clientGroups={clientGroupList?.data}
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateAutomatedEmailState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditEmail;
