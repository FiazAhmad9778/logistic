import Button from '@/components/Button';
import Form from '@/components/Form';
import PermissionWrapper from '@/components/Permission/permission-helper';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { RoleResponse } from '@/infrastructure/store/api/user-previleges/user-privileges-types';
import { Row, Col } from 'react-bootstrap';
import { SubmitHandler, FieldValues, UseFormReturn } from 'react-hook-form';
import { ClaimCode } from 'src/enums/claim-codes';

interface IUserForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
  roles?: RoleResponse[];
  clients?: ClientResponse[];
}

const AddUserForm: React.FC<IUserForm> = ({ useFormReturn, onSubmit, loadingState, roles, clients }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="firstName" placeholder="User first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="lastName" placeholder="User last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="phoneNumber" placeholder="Mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Role"
                name="roleId"
                options={roles?.map((option) => ({
                  name: option.name,
                  value: option.id,
                }))}
              />
            </Col>
            <PermissionWrapper requiredClaims={[ClaimCode.CliMgA]}>
              <Col xl={6} lg={6} md={6} sm={12}>
                <Form.Select
                  label="Client"
                  name="clientId"
                  options={clients?.map((option) => ({
                    name: option.name,
                    value: option.id,
                  }))}
                />
              </Col>
            </PermissionWrapper>
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

export default AddUserForm;
