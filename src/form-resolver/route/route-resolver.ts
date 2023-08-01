import * as yup from 'yup';

const genericResolver = {
  routeName: yup.string().required('Route name is required!'),
  routeStart: yup.string().required('Route start is required!'),
  routeEnd: yup.string().required('Route end is required!'),
  routeStartDate: yup.date().required('Route start date is required!').typeError('Route start date is required!'),
  routeEndDate: yup
    .date()
    .required('Route end date is required!')
    .typeError('Route end date is required!')
    .min(yup.ref('routeStartDate'), 'End date cannot be earlier than start date'),
  project: yup.string().required('Project is required!'),
  profile: yup.string().required('Profile is required!'),
};

export const addRouteResolver = yup.object().shape({
  routeName: genericResolver.routeName,
  routeStart: genericResolver.routeStart,
  routeEnd: genericResolver.routeEnd,
  routeStartDate: genericResolver.routeStartDate,
  routeEndDate: genericResolver.routeEndDate,
});

export const addRouteAssignmentResolver = yup.object().shape({
  routeEndDate: genericResolver.routeEndDate,
  project: genericResolver.project,
  profile: genericResolver.profile,
});
