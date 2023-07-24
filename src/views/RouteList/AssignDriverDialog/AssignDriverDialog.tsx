import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { HandleNotification } from '@/components/Toast';
import { appApi } from '@/infrastructure/store/api';
import { useDriversListQuery } from '@/infrastructure/store/api/driver/driver-api';
import { useSaveRouteDriverAssignmentMutation } from '@/infrastructure/store/api/route/route-api';
import { CreateRouteDriverAssignmentRequest } from '@/infrastructure/store/api/route/route-types';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IAssignDriverDialogProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AssignDriverDialog: React.FC<IAssignDriverDialogProps> = ({ isOpen, setCloseDialog }) => {
  const { selectedRouteIds } = useAppSelector((state) => state['route']);
  const useFormReturn = useForm();
  const dispatch = useAppDispatch();
  const { data: drivers } = useDriversListQuery(null);
  const [saveRouteDriverAssign, saveRouteDriverAssignState] = useSaveRouteDriverAssignmentMutation();

  const onSubmitAssignDriver: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      driverId: data.driverId,
      routeIds: selectedRouteIds,
    };
    const res = await saveRouteDriverAssign(payload as CreateRouteDriverAssignmentRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      setCloseDialog();
      dispatch(appApi.util.invalidateTags([{ type: 'Route', id: `routes` }]));
      HandleNotification(res.message || 'Driver assigned successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <div>
      <Dialog title="Assign Driver" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitAssignDriver}>
          <Form.Select
            label="Assign Driver"
            name="driverId"
            options={drivers?.data?.map((option) => ({
              name: `${option.firstName} ${option.lastName}`,
              value: option.id,
            }))}
          />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button
              btnSize="btn-sm"
              loaderSize={8}
              loading={saveRouteDriverAssignState.isLoading}
              disabled={saveRouteDriverAssignState.isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default AssignDriverDialog;
