import * as yup from 'yup';
import { emailRegex } from '@/helpers/regex/email-regex';

export const genericResolver = {
  email: yup.string().required('Email address is required!').matches(emailRegex, { message: 'Invalid email address!' }),
  password: yup
    .string()
    .min(8, 'Password must be 8 character long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires a uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required!')
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match!'),
};

export const LoginResolver = yup.object().shape({
  email: genericResolver.email,
  password: genericResolver.password,
});

export const ForgotPasswordResolver = yup.object().shape({
  email: genericResolver.email,
});

export const ResetPasswordResolver = yup.object().shape({
  currentPassword: genericResolver.password,
  newPassword: genericResolver.password,
  confirmPassword: genericResolver.confirmPassword,
});
