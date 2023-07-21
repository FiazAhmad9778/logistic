import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import EditOrderForm from './EditOrderForm';

const EditOrder = () => {
  const navigate = useNavigate();
  const useFormReturn = useForm();

  const onSubmitOrder: SubmitHandler<FieldValues> = (order) => {
    console.log(order);
  };

  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit Order</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <EditOrderForm useFormReturn={useFormReturn} onSubmit={onSubmitOrder} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditOrder;
