import * as yup from 'yup';

const genericResolver = {
  routeName: yup.string().required('Route name is required!'),
  routeStart: yup.string().required('Route start is required!'),
  routeEnd: yup.string().required('Route end is required!'),
  routeDate: yup.string().required('Route date is required!'),
  project: yup.string().required('Project is required!'),
  profile: yup.string().required('Profile is required!'),
};

export const addRouteResolver = yup.object().shape({
  routeName: genericResolver.routeName,
  routeStart: genericResolver.routeStart,
  routeEnd: genericResolver.routeEnd,
  routeDate: genericResolver.routeDate,
});

export const addRouteAssignmentResolver = yup.object().shape({
  routeDate: genericResolver.routeDate,
  project: genericResolver.project,
  profile: genericResolver.profile,
});
