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
              <Form.Input label="Client Group Name" name="clientGroupName" placeholder="Enter client group name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Client Name" name="clientName" placeholder="Enter client name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Contact First Name" name="firstName" placeholder="Enter contact first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Contact Last Name" name="lastName" placeholder="Enter contact last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Contact Email" name="email" placeholder="Enter contact email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Contact Mobile" name="phoneNumber" placeholder="Enter contact number" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" />
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
