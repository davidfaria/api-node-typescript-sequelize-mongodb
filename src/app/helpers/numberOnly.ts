const onlyNumber = (value: string): number | string => {
  if (!value) return value;
  const newValue = String(value).replace(/([^0-9])+/gim, '');
  return newValue;
};

export { onlyNumber };
