import Form from '@/components/Form';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
interface IClientForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const ClientForm: React.FC<IClientForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="FirstName" placeholder="Enter first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="LastName" placeholder="Enter last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="Email" placeholder="Enter email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="Mobile" placeholder="Enter mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Project" name="project" options={[]} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Profile" name="profile" options={[]} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input
                label="Matching Text"
                name="MatchingText"
                placeholder="Enter text which you want to match to profile"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Buffer Time" name="BufferTime" type="number" placeholder="Enter buffer time" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="Address" />
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

export default ClientForm;
