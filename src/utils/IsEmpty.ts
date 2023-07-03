const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && !value.trim().length) ||
  (typeof value === 'object' && !Object.keys(value).length);

export default isEmpty;
