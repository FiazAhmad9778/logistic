import Form from '@/components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { addClientGroupResolver } from 'src/form-resolver/client/client-resolver';
interface IClientGroupForm {
  onSubmit: SubmitHandler<FieldValues>;
}

const EditClientGroupForm: React.FC<IClientGroupForm> = ({ onSubmit }) => {
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
              <Form.Checkbox label="Mark as Active" name="isActive" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit">Update</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default EditClientGroupForm;
