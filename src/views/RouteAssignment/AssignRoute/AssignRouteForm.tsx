import Form from '@/components/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IRouteAssignForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const AssignRouteForm: React.FC<IRouteAssignForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Date" name="routeDate" type="date" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Project" name="project" options={[]} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Profile" name="profile" options={[]} />
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

export default AssignRouteForm;
