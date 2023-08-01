import Button from '@/components/Button';
import Form from '@/components/Form';
import PermissionWrapper from '@/components/Permission/permission-helper';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { DriverResponse } from '@/infrastructure/store/api/driver/driver-types';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ClaimCode } from 'src/enums/claim-codes';

interface IRouteForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
  clients?: ClientResponse[];
  drivers?: DriverResponse[];
}

const EditRouteForm: React.FC<IRouteForm> = ({ useFormReturn, onSubmit, loadingState, clients, drivers }) => {
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
              <Form.Select
                isClearable={true}
                label="Driver"
                name="driverId"
                options={drivers?.map((option) => ({
                  value: option.id,
                  name: option.firstName + ' ' + option.lastName,
                }))}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Name" name="routeName" placeholder="Enter Route Name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Start Date" name="routeStartDate" type="date" min={getDateFormatMDY(new Date())} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="End Date" name="routeEndDate" type="date" min={getDateFormatMDY(new Date())} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route Start" name="routeStart" placeholder="Enter route start" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Route End" name="routeEnd" placeholder="Enter route end" />
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
export default EditRouteForm;
