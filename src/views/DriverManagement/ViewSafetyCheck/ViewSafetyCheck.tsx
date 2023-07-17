import { Row, Col, Card } from 'react-bootstrap';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import ViewSafetyCheckForm from './ViewSafetyCheckForm';
import { useViewSafetyCheckQuery } from '@/infrastructure/store/api/driver/driver-api';

const ViewSafetyCheck = () => {
  const navigate = useNavigate();
  const { data: viewSafetyCheck } = useViewSafetyCheckQuery(null);
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header className="d-flex justify-content-between mb-2">
            <h4 className="card-title">View Safety Check</h4>
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          </Card.Header>
          <Card.Body className="pt-0">
            <ViewSafetyCheckForm viewSafetyCheck={viewSafetyCheck?.data} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewSafetyCheck;
