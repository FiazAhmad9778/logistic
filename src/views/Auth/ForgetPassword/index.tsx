import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/Button';
import { useForgotPasswordMutation } from '@/infrastructure/store/api/auth/auth-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordResolver } from 'src/form-resolver/auth-resolver';
import { InfoMessage } from 'src/constant/info-messages';

const ForgotPassword = () => {
  const [infoMessage, setInfoMessage] = useState<string>();
  const useFormReturn = useForm({
    resolver: yupResolver(ForgotPasswordResolver),
  });
  const location = useLocation();

  const [saveForgotPassword, state] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const payload = {
      email: e.email,
      host: `${import.meta.env.VITE_API_BASE_URL}${location.pathname}`,
    };
    await saveForgotPassword(payload)
      .unwrap()
      .then(() => {
        useFormReturn.reset({ email: '' });
        setInfoMessage(InfoMessage.ResetPasswordLink);
      })
      .catch((err) => console.log(err));
    console.log(payload);
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
          name="email"
          placeholder="Please enter your email"
          leading={<i className="far fa-envelope"></i>}
        />
        {!infoMessage && (
          <Button className="btn-block mt-3" type="submit" loading={state.isLoading}>
            Send Reset Link
          </Button>
        )}
        {infoMessage && (
          <Alert variant="" className="alert alert-primary text-center mt-3 py-2">
            {infoMessage}
          </Alert>
        )}
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
