import React from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const ResetPassword = () => {
  const useFormReturn = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      <h4>Create New Password</h4>
      <p className="mb-5 mt-4">{'Your new password must be different from previous used passwords.'}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          type="password"
          label="Old Password"
          name="oldPassword"
          placeholder="Please enter your password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Form.Input
          type="password"
          label="New Password"
          name="newPassword"
          placeholder="Please enter your password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Please enter your password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Button className="btn-block mt-3" type="submit">
          Reset Password
        </Button>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/auth/login" className="text-primary tx-medium">
            <i className="fa fa-angle-left"></i> Back To Login
          </Link>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ResetPassword;
