import Button from '@/components/Button';
import Form from '@/components/Form';
import PermissionWrapper from '@/components/Permission/permission-helper';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { DropdownOption } from 'src/constant/dropdown-options';
import { ClaimCode } from 'src/enums/claim-codes';

interface IEditQuestionForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  clients?: ClientResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}

const EditQuestionForm: React.FC<IEditQuestionForm> = ({ useFormReturn, onSubmit, clients, loadingState }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <PermissionWrapper requiredClaims={[ClaimCode.CliMgA]}>
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
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Question" name="question" placeholder="Enter question" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Order Type" name="orderTypeId" options={DropdownOption.OrderType} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Question Type" name="questionTypeId" options={DropdownOption.QuestionType} />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Question Description" name="description" placeholder="Enter description" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Checkbox label="Mark as Active" name="isActive" />
            </Col>
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

export default EditQuestionForm;
