import React from 'react';
import Dialog from '@/components/Modal';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { RoleResponse } from '@/infrastructure/store/api/user-previleges/user-privileges-types';
import { useDeleteRoleMutation } from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { HandleNotification } from '@/components/Toast';
import { UseFormReturn } from 'react-hook-form';

interface IDeleteRoleDialog {
  isOpen: boolean;
  setCloseDialog: () => void;
  roleList?: RoleResponse[];
  useDropdownFormReturn: UseFormReturn;
}

const DeleteRoleDialog: React.FC<IDeleteRoleDialog> = ({ isOpen, setCloseDialog, roleList, useDropdownFormReturn }) => {
  const [deleteRole] = useDeleteRoleMutation();
  const columnHelper = createColumnHelper<RoleResponse>();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Role Name',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.display({
      id: 'action',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i className="far fa-trash-alt" onClick={() => handleDeleteRole(info.row.original.id)}></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: roleList || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteRole = async (id: number) => {
    const res = await deleteRole(id).unwrap();
    if (!('error' in res) && res.success === true) {
      const roleValue = useDropdownFormReturn.getValues('role');
      if (roleValue && roleValue == id) {
        useDropdownFormReturn.reset();
      }
      HandleNotification(res.message || 'Role deleted successfully.', res.success === true);
      setCloseDialog();
    } else {
      HandleNotification(res?.errors[0], res.success === true);
    }
  };
  return (
    <React.Fragment>
      <Dialog title="Added Role" show={isOpen} handleClose={setCloseDialog}>
        <div className="my-2">
          <Table useReactTableReturn={useReactTableReturn} />
          <div className="d-flex justify-content-end mt-4">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteRoleDialog;
