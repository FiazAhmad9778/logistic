import Form from '@/components/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IRouteForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const RouteForm: React.FC<IRouteForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Name" name="routeName" placeholder="Enter Route Name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Start" name="routeStart" placeholder="Enter route start" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button>Save</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default RouteForm;
