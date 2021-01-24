export const userReducer = (state = null, action) => {
  if (action.type === "user/login") {
    return action.payload;
  }
  if (action.type === "user/logout") {
    return null;
  }
  return state;
};
