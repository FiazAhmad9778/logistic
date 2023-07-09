import Form from '@/components/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface ICustomerForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const CustomerForm: React.FC<ICustomerForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="firstName" placeholder="Enter first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="lastName" placeholder="Enter last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Id" name="customerId" placeholder="Enter customer unique id" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Enter email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="mobile" placeholder="Enter mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Profile Image" name="profileImage" type="file" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" placeholder="Enter address" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Mark as Active" name="active" />
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
export default CustomerForm;
