import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DriverRouteReviewForm from './DriverRouteReviewForm';

const DriverRouteReview = () => {
  const navigate = useNavigate();
  const onSubmitCustomer: SubmitHandler<FieldValues> = (e) => {
    console.log(e);
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Driver Review Route</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <DriverRouteReviewForm onSubmit={onSubmitCustomer} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default DriverRouteReview;
