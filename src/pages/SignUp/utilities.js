export const mapToRequest = ({
  name,
  email,
  password,
  phone,
  surname,
  country_key,
  prefix,
}) => ({
  user: {
    email,
    password,
  },
  phone: prefix + phone,
  invited_by: "RU-637164",
  name,
  surname,
  country_key,
});

export const mapErrorsToFieldsConfig = (errors) =>
  Object.keys(errors).reduce((acc, key) => {
    if (errors[key] instanceof Array) {
      return acc.concat({
        name: key,
        errors: errors[key],
      });
    }
    return acc.concat(
      Object.keys(errors[key]).map((internalKey) => ({
        name: internalKey,
        errors: errors[key][internalKey],
      }))
    );
  }, []);
