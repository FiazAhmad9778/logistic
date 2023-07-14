import Button from '@/components/Button';
import Form from '@/components/Form';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { editClientResolver } from 'src/form-resolver/client/client-resolver';
interface IEditClientForm {
  onSubmit: SubmitHandler<FieldValues>;
  client: ClientResponse;
  loadingState: boolean;
}
const EditClientForm: React.FC<IEditClientForm> = ({ onSubmit, client, loadingState }) => {
  const useFormReturn = useForm({
    resolver: yupResolver(editClientResolver),
    defaultValues: { ...client, clientName: client.name },
  });
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Client Name" name="clientName" placeholder="Enter client name" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Checkbox label="Mark as Active" name="isActive" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState} disabled={loadingState}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditClientForm;
