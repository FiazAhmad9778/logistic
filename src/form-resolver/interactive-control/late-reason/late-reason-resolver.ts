import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  reason: yup.string().required('Reason is required!'),
};

export const addReasonResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  reason: genericResolver.reason,
});
