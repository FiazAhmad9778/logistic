import Button from '@/components/Button';
import Form from '@/components/Form';
import React from 'react';
import Dialog from '@/components/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSaveRoleMutation } from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { HandleNotification } from '@/components/Toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRoleResolver } from 'src/form-resolver/user-role';

interface IAddRoleDialog {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AddRoleDialog: React.FC<IAddRoleDialog> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm({
    resolver: yupResolver(userRoleResolver),
  });

  const [saveRole, saveRoleState] = useSaveRoleMutation();
  const onSubmitRole: SubmitHandler<FieldValues> = async (e) => {
    const payload = {
      roleId: null,
      roleName: e.roleName,
      claims: [],
    };
    const res = await saveRole(payload).unwrap();
    if (res.success === true) {
      HandleNotification(res.message || 'Role added successfully.', res.success);
      setCloseDialog();
      useFormReturn.reset();
    } else {
      HandleNotification(res?.errors[0], res.success);
    }
  };
  return (
    <React.Fragment>
      <Dialog title="Add Role" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitRole}>
          <Form.Input label="Role Name" name="roleName" placeholder="Enter role name" />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button
              btnSize="btn-sm"
              loading={saveRoleState.isLoading}
              loaderSize={8}
              disabled={saveRoleState.isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddRoleDialog;
