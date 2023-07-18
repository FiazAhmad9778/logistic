import Button from '@/components/Button';
import Form from '@/components/Form';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface IRouteForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}
const RouteForm: React.FC<IRouteForm> = ({ useFormReturn, onSubmit, loadingState }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Name" name="routeName" placeholder="Enter Route Name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Date" name="routeDate" type="date" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Start" name="routeStart" placeholder="Enter route start" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Start" name="routeEnd" placeholder="Enter route end" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState} disabled={loadingState}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default RouteForm;
