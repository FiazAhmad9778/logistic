import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import SafetyCheckForm from './SafetyCheckForm';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const AddSafetyCheck = () => {
  const navigate = useNavigate();
  const onSubmitSafetyCheck: SubmitHandler<FieldValues> = (e) => {
    console.log(e);
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Add Safety Check</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <SafetyCheckForm onSubmit={onSubmitSafetyCheck} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSafetyCheck;
