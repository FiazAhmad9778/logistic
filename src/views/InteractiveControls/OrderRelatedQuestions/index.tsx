import Button from '@/components/Button';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OrderRelatedQuestionList from './OrderRelatedQuestionList/OrderRelatedQuestionList';

const OrderRelatedQuestions = () => {
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
                onClick={() => navigate('/order-related-questions-list/add-question')}
              >
                {'New Question'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <OrderRelatedQuestionList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderRelatedQuestions;