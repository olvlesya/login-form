export const logIn = (user) => ({
  type: "user/login",
  payload: user,
});

export const logOut = () => ({
  type: "user/logout",
});
