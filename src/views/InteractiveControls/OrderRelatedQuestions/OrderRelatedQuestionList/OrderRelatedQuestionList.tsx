import Button from '@/components/Button';
import Dialog from '@/components/Modal';
import Table from '@/components/Table';
import { useDialogState } from '@/hooks/useDialogState';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader';
import { HandleNotification } from '@/components/Toast';
import { getDateFormatMDY } from '@/helpers/function/date-format';
import {
  useDeleteOrderQuestionMutation,
  useOrderQuestionListQuery,
} from '@/infrastructure/store/api/order-question/order-question-api';
import { OrderQuestionResponse } from '@/infrastructure/store/api/order-question/order-question-types';

const OrderRelatedQuestionList = () => {
  const [questionId, setQuestionId] = useState<number>();
  const navigate = useNavigate();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();

  const { data: orderQuestionListing, isLoading: IsOrderQuestionLoading } = useOrderQuestionListQuery(null);
  const [deleteOrderQuestion, deleteOrderQuestionState] = useDeleteOrderQuestionMutation();

  const columnHelper = createColumnHelper<OrderQuestionResponse>();
  const columns = [
    columnHelper.accessor('question', {
      header: 'Question',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('questionType', {
      header: 'Question Type',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('orderType', {
      header: 'Order Type',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      cell: ({ getValue }) => (
        <span className={`${getValue() ? 'text-success' : 'text-danger'}`}>{getValue() ? 'Yes' : 'No'}</span>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
    columnHelper.accessor('createdDate', {
      header: 'Date Added',
      cell: ({ getValue }) => <span>{getDateFormatMDY(getValue()) || ''}</span>,
    }),
    columnHelper.display({
      id: 'Order Related Questions List',
      header: () => <span>Action</span>,
      cell: (info) => (
        <span className="d-block text-center cursor-pointer text-primary">
          <i
            className="fa fa-edit me-1"
            onClick={() =>
              navigate('/order-related-questions-list/edit-question', {
                state: {
                  questionId: info.row.original.id,
                },
              })
            }
          ></i>
          <i
            className="far fa-trash-alt"
            onClick={() => {
              setOpenDialog();
              setQuestionId(info.row.original.id);
            }}
          ></i>
        </span>
      ),
    }),
  ];

  const useReactTableReturn = useReactTable({
    data: orderQuestionListing?.data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOrderQuestion = async () => {
    const res = await deleteOrderQuestion(questionId).unwrap();
    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Order question deleted successfully.', res.success === true);
    } else {
      setCloseDialog();
      HandleNotification(res?.errors[0], res.success === true);
    }
  };

  const loading = IsOrderQuestionLoading;
  return (
    <React.Fragment>
      {loading ? <Loader /> : <Table useReactTableReturn={useReactTableReturn} />}
      <Dialog title="Delete Order Question" show={isOpen} handleClose={setCloseDialog}>
        <div>
          <p className="tx-14 tx-medium mg-b-20">Are you sure you want to delete this item?</p>
          <div className="d-flex justify-content-end">
            <Button
              btnType="btn-outline-danger"
              btnSize="btn-sm"
              className="pd-x-25 me-2"
              type="button"
              onClick={setCloseDialog}
            >
              Cancel
            </Button>
            <Button
              btnType="btn-primary"
              btnSize="btn-sm"
              className="pd-x-25"
              type="button"
              loaderSize={8}
              onClick={handleOrderQuestion}
              loading={deleteOrderQuestionState.isLoading}
              disabled={deleteOrderQuestionState.isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default OrderRelatedQuestionList;
