import Button from '@/components/Button';
import Form from '@/components/Form';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IDriverForm {
  onSubmitUser: SubmitHandler<FieldValues>;
}
const DriverForm: React.FC<IDriverForm> = ({ onSubmitUser }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitUser}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="firstName" placeholder="User first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="lastName" placeholder="User last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Driver Id" name="driverId" placeholder="Mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="mobile" placeholder="Mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Client Group" name="role" options={[]} placeholder="Select Client Group" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Address" name="address" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Profile Image" name="profile" type="file" />
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

export default DriverForm;
