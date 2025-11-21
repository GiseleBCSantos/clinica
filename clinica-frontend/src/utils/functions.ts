export const getError = (formik: any, field: string) =>
  typeof formik.errors[field] === "string" ? formik.errors[field] : undefined;
