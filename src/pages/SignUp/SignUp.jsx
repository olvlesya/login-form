import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { axios } from "./request";
import { layout, tailFormItemLayout } from "./formConfig";
import { prefixSelector } from "./inputAddons";
import { mapToRequest, mapErrorsToFieldsConfig } from "./utilities";
import { Redirect } from "react-router-dom";

export const SignUp = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const [formInstance] = Form.useForm();
  const [redirect, setRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/login" push />;
  }

  const onFinish = (fields) => {
    setFormDisabled(true);
    const request = mapToRequest(fields);
    console.log(request);
    axios(false)
      .then(() => {
        notification.success({ message: "Вы успешно зарегистрированы!" });
      })
      .catch((errors) => {
        notification.error({ message: "Произошла ошибка!" });
        formInstance.setFields(mapErrorsToFieldsConfig(errors));
      })
      .then(() => {
        setFormDisabled(false);
      });
  };

  return (
    <Form
      {...layout}
      name="sign-up"
      initialValues={{
        prefix: "+7",
      }}
      form={formInstance}
      className="logInForm"
      onFinish={onFinish}
    >
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            message: "Введите верный адрес электоронной почты",
            type: "email",
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
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password disabled={formDisabled} />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please repeat the password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Пароли не совпадают!");
            },
          }),
        ]}
      >
        <Input.Password disabled={formDisabled} />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="phone"
        extra="Международный формат. Может использоваться в качестве логина"
        rules={[
          {
            required: true,
            pattern: /^\d+$/,
            message: "Номер телефона должен содержать только числа",
          },
        ]}
      >
        <Input addonBefore={prefixSelector} disabled={formDisabled} />
      </Form.Item>
      <Form.Item
        label="Ваше имя"
        name="name"
        rules={[
          {
            required: true,
            message: "Укажите ваше имя!",
          },
        ]}
      >
        <Input disabled={formDisabled} />
      </Form.Item>
      <Form.Item
        label="Ваша фамилия"
        name="surname"
        rules={[
          {
            required: true,
            message: "Укажите вашу фамилию!",
          },
        ]}
      >
        <Input disabled={formDisabled} />
      </Form.Item>
      <Form.Item
        label="Ключ страны"
        name="country_key"
        rules={[
          {
            required: true,
            message: "Укажите ключ страны",
          },
        ]}
      >
        <Input disabled={formDisabled} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button loading={formDisabled} type="primary" htmlType="submit">
          Создать аккаунт
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setRedirect(true);
          }}
        >
          Авторизация
        </Button>
      </Form.Item>
    </Form>
  );
};
