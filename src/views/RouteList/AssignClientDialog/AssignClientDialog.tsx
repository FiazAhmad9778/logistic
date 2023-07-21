import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IAssignClientDialogProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AssignClientDialog: React.FC<IAssignClientDialogProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  const { data: clients } = useClientListQuery(null);

  const onSubmitOrderInstructions: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Dialog title="Assign Client" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitOrderInstructions}>
          <Form.Select
            label="Assign Client"
            name="assignClient"
            options={clients?.data?.map((option) => ({
              name: option.name,
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

export default AssignClientDialog;
