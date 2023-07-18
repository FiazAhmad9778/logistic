import * as yup from 'yup';
export interface IDriverSchema {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  driverId: string;
  isActive: boolean;
}

const genericResolver = {
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  phoneNumber: yup.string().required('Mobile is required!'),
  address: yup.string().required('Address is required!'),
  driverId: yup.string().required('Driver Id is required!'),
  isActive: yup.boolean(),
};

export const addDriverResolver = yup.object().shape({
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  driverId: genericResolver.driverId,
  email: genericResolver.email,
  phoneNumber: genericResolver.phoneNumber,
  address: genericResolver.address,
});

export const editDriverResolver = yup.object().shape({
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  phoneNumber: genericResolver.phoneNumber,
  address: genericResolver.address,
  isActive: genericResolver.isActive,
});
