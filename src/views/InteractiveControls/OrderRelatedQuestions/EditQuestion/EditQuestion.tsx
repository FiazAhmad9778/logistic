import { Card, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import EditQuestionForm from './EditQuestionForm';
import {
  useOrderQuestionByIdQuery,
  useUpdateOrderQuestionMutation,
} from '@/infrastructure/store/api/order-question/order-question-api';
import { UpdateOrderQuestionRequest } from '@/infrastructure/store/api/order-question/order-question-types';

const EditQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: orderQuestion, isLoading: IsOrderQuestionLoading } = useOrderQuestionByIdQuery(
    location.state.questionId ?? skipToken,
  );
  const useFormReturn = useForm({
    // resolver: yupResolver(addQuestionResolver),
    defaultValues: orderQuestion?.data,
  });

  const [updateOrderQuestion, updateOrderQuestionState] = useUpdateOrderQuestionMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await updateOrderQuestion(data as UpdateOrderQuestionRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/order-related-questions-list', { replace: true });
      HandleNotification(res.message || 'Order question updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (orderQuestion) {
      useFormReturn.reset(orderQuestion.data);
    }
  }, [orderQuestion, useFormReturn]);

  const loading = IsOrderQuestionLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Edit Question</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditQuestionForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmit}
                loadingState={updateOrderQuestionState.isLoading}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditQuestion;
