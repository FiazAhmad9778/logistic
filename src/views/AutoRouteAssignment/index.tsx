import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@/components/Button';
import AutoRouteAssignmentList from './AutoRouteAssignment/AutoRouteAssignment';
import { useNavigate } from 'react-router-dom';

const AutoRouteAssignment = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <Button
                btnType="btn-outline-primary"
                icon={<i className="fa fa fa-plus"></i>}
                onClick={() => navigate('/auto-route-assignment-list/add-auto-route')}
              >
                {'New Auto Route'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AutoRouteAssignmentList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AutoRouteAssignment;
