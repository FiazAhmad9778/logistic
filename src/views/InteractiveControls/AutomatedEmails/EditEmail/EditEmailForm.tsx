import Button from '@/components/Button';
import Form from '@/components/Form';
import PermissionWrapper from '@/components/Permission/permission-helper';
import { ClientGroupResponse } from '@/infrastructure/store/api/client-group/client-group-types';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { SectionResponse } from '@/infrastructure/store/api/lookup/lookup-types';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ClaimCode } from 'src/enums/claim-codes';

interface IEditEmailForm {
  onSubmit: SubmitHandler<FieldValues>;
  sections?: SectionResponse[];
  clients?: ClientResponse[];
  clientGroups?: ClientGroupResponse[];
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}

const EditEmailForm: React.FC<IEditEmailForm> = ({ useFormReturn, onSubmit, sections, clients, loadingState }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Enter email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Section"
                name="sectionId"
                options={sections?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
            </Col>
            <PermissionWrapper requiredClaims={[ClaimCode.CliMgE]}>
              <Col xl={6} lg={6} md={6} sm={12}>
                <Form.Select
                  label="Client"
                  name="clientId"
                  options={clients?.map((option) => ({
                    value: option.id,
                    name: option.name,
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

export default EditEmailForm;
