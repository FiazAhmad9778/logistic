import * as yup from 'yup';

export const genericResolver = {
  reason: yup.string().required('Reason is required!'),
};

export const addReasonResolver = yup.object().shape({
  reason: genericResolver.reason,
});
