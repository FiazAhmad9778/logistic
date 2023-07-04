import React from 'react';
import { Alert } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const ForgotPassword = () => {
  const useFormReturn = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      <h4>
        Forgot Password? <i className="fa fa-unlock-alt tx-primary"></i>
      </h4>
      <p className="mb-5 mt-4">{"Enter your email and we'll send you instructions to reset your password"}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          label="Email"
          name="username"
          placeholder="Please enter your email"
          leading={<i className="far fa-envelope"></i>}
        />
        <Button className="btn-block mt-3" type="submit">
          Send Reset Link
        </Button>
        <Alert variant="" className="alert alert-primary text-center mt-3 py-2">
          Email sent successfully
        </Alert>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/auth/login" className="text-primary tx-medium">
            <i className="fa fa-angle-left"></i> Back To Login
          </Link>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ForgotPassword;
