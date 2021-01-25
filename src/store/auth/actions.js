export const logIn = (data) => ({
  type: "auth/login",
  payload: data,
});

export const logOut = () => ({
  type: "auth/logout",
});
