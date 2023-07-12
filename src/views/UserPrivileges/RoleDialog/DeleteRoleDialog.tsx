import React from 'react';
import Dialog from '@/components/Modal';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { RoleResponse } from '@/infrastructure/store/api/user-previleges/user-privileges-types';
import { useDeleteRoleMutation } from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { HandleNotification } from '@/components/Toast';
import Loader from '@/components/Loader';

interface IDeleteDialog {
  isOpen: boolean;
  setCloseDialog: () => void;
  roleList?: RoleResponse[];
}

const DeleteRoleDialog: React.FC<IDeleteDialog> = ({ isOpen, setCloseDialog, roleList }) => {
  const [deleteRole, state] = useDeleteRoleMutation();
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
    console.log(id);
    const res = await deleteRole(id).unwrap();
    if (!('error' in res) && res.success === true) {
      HandleNotification(res.message || 'Role deleted successfully.', res.success === true);
      setCloseDialog();
    } else {
      HandleNotification(res?.errors[0], res.success === true);
    }
  };
  return (
    <React.Fragment>
      <Dialog title="Added Role" show={isOpen} handleClose={setCloseDialog}>
        {state.isLoading ? (
          <div className="fixed inset-0 opacity-100 d-flex align-items-center">
            <Loader />
          </div>
        ) : (
          <div className="my-2">
            <Table useReactTableReturn={useReactTableReturn} />
            <div className="d-flex justify-content-end mt-4">
              <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteRoleDialog;
