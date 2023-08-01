import * as yup from 'yup';

const genericResolver = {
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  phoneNumber: yup.string().required('Mobile is required!'),
  address: yup.string().required('Address is required!'),
  isActive: yup.boolean(),
};

export const addCustomerResolver = yup.object().shape({
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  phoneNumber: genericResolver.phoneNumber,
  address: genericResolver.address,
});
