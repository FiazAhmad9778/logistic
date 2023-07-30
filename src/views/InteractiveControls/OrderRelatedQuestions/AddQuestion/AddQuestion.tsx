import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { HandleNotification } from '@/components/Toast';
import AddQuestionForm from './AddQuestionForm';
import { useSaveOrderQuestionMutation } from '@/infrastructure/store/api/order-question/order-question-api';
import { CreateOrderQuestionRequest } from '@/infrastructure/store/api/order-question/order-question-types';
import { addQuestionResolver } from 'src/form-resolver/interactive-control/order-related-question/related-question-resolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';

const AddQuestion = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addQuestionResolver),
  });
  const navigate = useNavigate();

  const { data: clientsList } = useClientListQuery(null);
  const [saveOrderQuestion, saveOrderQuestionState] = useSaveOrderQuestionMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveOrderQuestion(data as CreateOrderQuestionRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/order-related-questions-list', { replace: true });
      HandleNotification(res.message || 'Order question added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Question</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddQuestionForm
              clients={clientsList?.data}
              useFormReturn={useFormReturn}
              onSubmit={onSubmit}
              loadingState={saveOrderQuestionState.isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddQuestion;
