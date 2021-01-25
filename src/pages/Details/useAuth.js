import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/actions";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.access) {
      axios
        .get(`http://erp.apptrix.ru/api/clients/${auth.client_id}/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          notification.error({
            message: "Произошла ошибка!",
            description: "Пожалуйста, авторизируйтесь ещё раз",
          });
          dispatch(logOut());
        });
    }
  }, [auth?.access, auth?.client_id]);

  return user;
};
