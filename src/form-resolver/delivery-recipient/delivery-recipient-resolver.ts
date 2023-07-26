import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().required('Name is required!'),
  clientId: yup.number(),
};

export const addDeliveryRecipientResolver = yup.object().shape({
  name: genericResolver.name,
  clientId: genericResolver.clientId,
});
export const editDeliveryRecipientResolver = yup.object().shape({
  name: genericResolver.name,
  clientId: genericResolver.clientId,
});
