import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  name: yup.string().required('Name is required!'),
  min: yup.number().typeError('Min temperature is required!').required('Min temperature is required!'),
  max: yup.number().typeError('Min temperature is required!').required('Max temperature is required!'),
};

export const addTemperatureRangeResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  name: genericResolver.name,
  min: genericResolver.min,
  max: genericResolver.max,
});

export const editTemperatureRangeResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  name: genericResolver.name,
  min: genericResolver.min,
  max: genericResolver.max,
});
