import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/infrastructure/store/api/auth/auth-api';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { setAuth } from '@/infrastructure/store/features/auth/auth-slice';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginResolver } from 'src/form-resolver/auth-resolver';

const Login = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(LoginResolver),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginAPi, state] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    if (state.isLoading) return;

    const res = await loginAPi({ email: e.email, password: e.password }).unwrap();

    if ('error' in res && 'data' in res && res?.error) {
      return;
    }

    if (!('error' in res) && res.success === true) {
      dispatch(setAuth(res.data));
      navigate('/', { replace: true });
    } else {
      useFormReturn.setError('email', { message: res?.message ?? 'Email or Password is incorrect!' });
      useFormReturn.setError('password', { message: res?.message ?? 'Email or password is incorrect!' });
      return;
    }
  };

  return (
    <React.Fragment>
      <h4>Welcome Back</h4>
      <p className="mb-5">{"Enter your email and we'll send you instructions to reset your password"}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          label="Email"
          name="email"
          placeholder="Please enter your email"
          leading={<i className="far fa-envelope"></i>}
        />
        <Form.Input
          type="password"
          label="Password"
          name="password"
          placeholder="Please enter your password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <div className="d-flex justify-content-between align-items-center">
          <Form.Checkbox label="Remember me" name="remember" />
          <Link to="/auth/forget-password" className="text-primary tx-medium">
            Forget Password?
          </Link>
        </div>
        <Button type="submit" className="btn-block mt-3" loading={state.isLoading} disabled={state.isLoading}>
          SIGN IN
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Login;
