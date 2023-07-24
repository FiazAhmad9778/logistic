import * as yup from 'yup';

const genericResolver = {
  uniqueReferenceCode: yup.string().required('Unique reference code is required!'),
  customerName: yup.string().required('Customer name is required!'),
  customerEmail: yup.string().required('Customer email is required!'),
  townCity: yup.string().required('Town/City is required!'),
  country: yup.string().required('Country is required!'),
  postCode: yup.string().required('Post code is required!'),
  typeOfOrder: yup.string().required('Type of order is required!'),
  orderWindowOpen: yup.string().required('Order window open is required!'),
  orderWindowClose: yup.string().required('Order window close is required!'),
  loadingUnit: yup.string().required('Loading unit is required!'),
  productWeight: yup.string().required('Product weight is required!'),
  address: yup.string().required('Address is required!'),
  vehicleType: yup.string().required('Vehicle type is required!'),
};

export const addOrderResolver = yup.object().shape({
  uniqueReferenceCode: genericResolver.uniqueReferenceCode,
  customerName: genericResolver.customerName,
  customerEmail: genericResolver.customerEmail,
  townCity: genericResolver.townCity,
  country: genericResolver.country,
  postCode: genericResolver.postCode,
  typeOfOrder: genericResolver.typeOfOrder,
  orderWindowOpen: genericResolver.orderWindowOpen,
  orderWindowClose: genericResolver.orderWindowClose,
  loadingUnit: genericResolver.loadingUnit,
  productWeight: genericResolver.productWeight,
  address: genericResolver.address,
  vehicleType: genericResolver.vehicleType,
});
