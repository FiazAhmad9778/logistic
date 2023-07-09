import Form from '@/components/Form';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IDriverRouteReviewForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const DriverRouteReviewForm: React.FC<IDriverRouteReviewForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Driver Name" name="DriverName" disabled />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Name" name="CustomerName" disabled />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Driver Performance" name="DriverPerformance" disabled />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Review" name="Review" disabled />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Did the driver collect blue fridge?" name="isFridge?" disabled />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Did the driver collect empty trollies?" name="isTrollies?" disabled />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default DriverRouteReviewForm;
