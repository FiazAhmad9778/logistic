import Button from '@/components/Button';
import Form from '@/components/Form';
import { ClientGroupResponse } from '@/infrastructure/store/api/client-group/client-group-types';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { editClientGroupResolver } from 'src/form-resolver/client/client-resolver';
interface IClientGroupForm {
  onSubmit: SubmitHandler<FieldValues>;
  clientGroup: ClientGroupResponse;
  loadingState: boolean;
}

const EditClientGroupForm: React.FC<IClientGroupForm> = ({ onSubmit, clientGroup, loadingState }) => {
  const useFormReturn = useForm({
    resolver: yupResolver(editClientGroupResolver),
    defaultValues: { ...clientGroup, clientGroupName: clientGroup.name },
  });
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Client Group Name" name="clientGroupName" placeholder="Enter client group name" />
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
export default EditClientGroupForm;