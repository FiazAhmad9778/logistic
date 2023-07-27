import * as yup from 'yup';

const genericResolver = {
  clientName: yup.string().required('Client name is required!'),
  clientGroupName: yup.string().required('Client group name is required!'),
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  phoneNumber: yup.string().required('Mobile is required!'),
  address: yup.string().required('Address is required!'),
  isActive: yup.boolean(),
};

export const addClientResolver = yup.object().shape({
  clientName: genericResolver.clientName,
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  phoneNumber: genericResolver.phoneNumber,
  address: genericResolver.address,
});

export const editClientResolver = yup.object().shape({
  clientName: genericResolver.clientName,
  address: genericResolver.address,
  isActive: genericResolver.isActive,
});

export const addClientGroupResolver = yup.object().shape({
  clientGroupName: genericResolver.clientGroupName,
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  phoneNumber: genericResolver.phoneNumber,
  address: genericResolver.address,
});

export const editClientGroupResolver = yup.object().shape({
  clientGroupName: genericResolver.clientGroupName,
});
