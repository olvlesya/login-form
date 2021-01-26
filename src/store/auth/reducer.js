export const authReducer = (state = null, action) => {
  if (action.type === "auth/login") {
    return action.payload;
  }
  if (action.type === "auth/logout") {
    return null;
  }
  if (action.type === "auth/refresh") {
    return {
      ...state,
      access: action.payload,
    };
  }
  return state;
};
