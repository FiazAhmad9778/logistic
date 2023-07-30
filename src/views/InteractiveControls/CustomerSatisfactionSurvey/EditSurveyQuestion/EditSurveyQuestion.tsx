import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import EditSurveyQuestionForm from './EditSurveyQuestionForm';
import {
  useSurveyQuestionByIdQuery,
  useUpdateSurveyQuestionMutation,
} from '@/infrastructure/store/api/customer-survey-question/customer-survey-question-api';
import { UpdateSurveyQuestionRequest } from '@/infrastructure/store/api/customer-survey-question/customer-survey-question-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSurveyQuestionResolver } from 'src/form-resolver/interactive-control/survey-question/survey-question-resolver';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';

const EditSurveyQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: surveyQuestion, isLoading: IsSurveyQuestionLoading } = useSurveyQuestionByIdQuery(
    location.state.questionId ?? skipToken,
  );
  const useFormReturn = useForm({
    resolver: yupResolver(addSurveyQuestionResolver),
    defaultValues: surveyQuestion?.data,
  });

  const { data: clientsList } = useClientListQuery(null);
  const [updateSurveyQuestion, updateSurveyQuestionState] = useUpdateSurveyQuestionMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateSurveyQuestion(data as UpdateSurveyQuestionRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/customer-satisfaction-survey-questions-list', { replace: true });
      HandleNotification(res.message || 'Survey question updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (surveyQuestion) {
      useFormReturn.reset(surveyQuestion.data);
    }
  }, [surveyQuestion, useFormReturn]);

  const loading = IsSurveyQuestionLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Survey Question</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditSurveyQuestionForm
                clients={clientsList?.data}
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateSurveyQuestionState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditSurveyQuestion;
