import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut, refreshToken } from "../../store/auth/actions";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.access) {
      axios
        .get(`http://erp.apptrix.ru/api/clients/${auth.client_id}/`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            axios
              .post("http://erp.apptrix.ru/api/clients/token/refresh/", {
                refresh: auth.refresh,
              })
              .then((response) => {
                dispatch(refreshToken(response.data.access));
              })
              .catch(() => {
                notification.error({
                  message: "Произошла ошибка!",
                  description: "Пожалуйста, авторизируйтесь ещё раз",
                });
                dispatch(logOut());
              });
          } else {
            dispatch(logOut());
          }
        });
    }
  }, [auth?.access, auth?.client_id, auth?.refresh]);

  return user;
};
