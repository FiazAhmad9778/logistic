import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import AddSurveyQuestionForm from './AddSurveyQuestionForm';
import { useSaveSurveyQuestionMutation } from '@/infrastructure/store/api/customer-survey-question/customer-survey-question-api';
import { CreateSurveyQuestionRequest } from '@/infrastructure/store/api/customer-survey-question/customer-survey-question-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSurveyQuestionResolver } from 'src/form-resolver/interactive-control/survey-question/survey-question-resolver';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';

const AddSurveyQuestion = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addSurveyQuestionResolver),
  });
  const navigate = useNavigate();

  const { data: clientsList } = useClientListQuery(null);
  const [saveSurveyQuestion, saveSurveyQuestionState] = useSaveSurveyQuestionMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveSurveyQuestion(data as CreateSurveyQuestionRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-satisfaction-survey-questions-list', { replace: true });
      HandleNotification(res.message || 'Survey question added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Survey Question</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddSurveyQuestionForm
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveSurveyQuestionState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSurveyQuestion;
