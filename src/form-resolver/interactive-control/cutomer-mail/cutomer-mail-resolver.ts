import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  subject: yup.string().required('Subject is required!'),
  body: yup.string().required('Body is required!'),
};

export const addCustomerMailResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  subject: genericResolver.subject,
  body: genericResolver.body,
});
