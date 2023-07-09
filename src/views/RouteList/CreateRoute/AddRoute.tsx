import { Row, Col, Card } from 'react-bootstrap';
import RouteForm from './RouteForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const AddRoute = () => {
  const navigate = useNavigate();
  const onSubmitRoute: SubmitHandler<FieldValues> = (e) => {
    console.log(e);
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Add Route</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <RouteForm onSubmit={onSubmitRoute} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddRoute;
