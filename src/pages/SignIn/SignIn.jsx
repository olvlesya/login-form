import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/auth/actions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const SignIn = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/signup" push />;
  }
  const onFinish = (values) => {
    setFormDisabled(true);
    axios
      .post("http://erp.apptrix.ru/api/clients/token/", values)
      .then((response) => {
        dispatch(logIn(response.data));
      })
      .catch((error) => {
        notification.error({
          message: "Ошибка авторизации!",
          description: error.response.data.detail,
        });
        setFormDisabled(false);
      });
  };

  return (
    <Form {...layout} name="sign-in" className="logInForm" onFinish={onFinish}>
      <Form.Item
        label="Логин"
        name="username"
        extra="Адрес электронной почты или номер телефона"
        rules={[
          {
            required: true,
            message: "Введите пользователя!",
          },
        ]}
      >
        <Input disabled={formDisabled} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Введите пароль!",
          },
        ]}
      >
        <Input.Password disabled={formDisabled} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Вход
        </Button>
        <Button
          htmlType="button"
          loading={formDisabled}
          onClick={() => {
            setRedirect(true);
          }}
        >
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  );
};
