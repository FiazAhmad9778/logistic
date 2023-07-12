import Form from '@/components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { addClientGroupResolver } from 'src/form-resolver/client/client-resolver';
interface IClientGroupForm {
  onSubmit: SubmitHandler<FieldValues>;
}

const AddClientGroupForm: React.FC<IClientGroupForm> = ({ onSubmit }) => {
  const useFormReturn = useForm({
    resolver: yupResolver(addClientGroupResolver),
  });
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Client Group Name" name="name" placeholder="Enter client group name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Client Name" name="clientName" placeholder="Enter client name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="firstName" placeholder="Enter first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="lastName" placeholder="Enter last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Enter email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="phone" placeholder="Enter mobile" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Mark as Active" name="isActive" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit">Save</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default AddClientGroupForm;
