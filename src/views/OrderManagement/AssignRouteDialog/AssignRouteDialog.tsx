import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { useRouteListQuery } from '@/infrastructure/store/api/route/route-api';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IAssignRouteDialogProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AssignRouteDialog: React.FC<IAssignRouteDialogProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  const { data: routes } = useRouteListQuery(null);

  const onSubmitOrderInstructions: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Dialog title="Assign Route" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitOrderInstructions}>
          <Form.Select
            label="Assign Route"
            name="assignRoute"
            options={routes?.data?.map((option) => ({
              name: option.routeName,
              value: option.id,
            }))}
          />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button btnSize="btn-sm">Save</Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default AssignRouteDialog;
