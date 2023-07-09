import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DriverForm from './DriverForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const AddDriver = () => {
  const navigate = useNavigate();

  const onSubmitUser: SubmitHandler<FieldValues> = (e) => {
    console.log(e);
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">Add Driver</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <DriverForm onSubmitUser={onSubmitUser} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddDriver;
