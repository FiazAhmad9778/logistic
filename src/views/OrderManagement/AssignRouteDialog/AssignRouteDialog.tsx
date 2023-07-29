import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { HandleNotification } from '@/components/Toast';
import { appApi } from '@/infrastructure/store/api';
import { useDriversListQuery } from '@/infrastructure/store/api/driver/driver-api';
import { useSaveOrderRouteAssignmentMutation } from '@/infrastructure/store/api/order-route-assignment/order-route-assignment-api';
import { CreateOrderRouteAssignmentRequest } from '@/infrastructure/store/api/order-route-assignment/order-route-assignment-types';
import { useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IAssignRouteDialogProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AssignRouteDialog: React.FC<IAssignRouteDialogProps> = ({ isOpen, setCloseDialog }) => {
  const { selectedOrderIds } = useAppSelector((state) => state['order']);
  const useFormReturn = useForm();
  const dispatch = useAppDispatch();
  const { data: routes } = useRouteListQuery(null);
  const { data: drivers } = useDriversListQuery(null);
  const [saveOrderRouteAssign, saveOrderRouteAssignState] = useSaveOrderRouteAssignmentMutation();

  const onSubmitOrderInstructions: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      routeId: data.routeId,
      orderIds: selectedOrderIds,
    };
    const res = await saveOrderRouteAssign(payload as CreateOrderRouteAssignmentRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      setCloseDialog();
      dispatch(appApi.util.invalidateTags([{ type: 'Order', id: `orders` }]));
      HandleNotification(res.message || 'Route assigned successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  return (
    <div>
      <Dialog title="Assign Route" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitOrderInstructions}>
          <Form.Select
            label="Assign Route"
            name="routeId"
            options={routes?.data?.map((option) => ({
              name: option.routeName,
              value: option.id,
            }))}
          />
          <Form.Select
            label="Driver"
            name="driverId"
            options={drivers?.data?.map((option) => ({
              value: option.id,
              name: option.firstName + ' ' + option.lastName,
            }))}
          />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button
              btnSize="btn-sm"
              loaderSize={8}
              loading={saveOrderRouteAssignState.isLoading}
              disabled={saveOrderRouteAssignState.isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default AssignRouteDialog;
