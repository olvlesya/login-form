import React, { useState, useEffect } from "react";
import { Card, Popover, Modal, Spin, notification } from "antd";
import axios from "axios";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LogoutOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/auth/actions";
import {
  detailsUserName,
  detailsUserEmail,
  detailsUserPhone,
  detailsUserTitle,
  detailsUserStatus,
  detailsCard,
  detailsCardAvatar,
} from "./Details.module.scss";

export const Details = () => {
  // Может быть в Redux, но для этого приложения можно использовать просто useState
  const [user, setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [confirmVisible, setConfirmVisible] = useState(false);

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

  return user ? (
    <React.Fragment>
      <Card
        title={
          <div className={detailsUserTitle}>
            Данные пользователя {user.client_id}
          </div>
        }
        extra={
          <Popover
            content={
              user.verified
                ? "Пользователь верифицирован"
                : "Пользователь неверифицирован"
            }
          >
            {user.verified ? (
              <CheckCircleTwoTone
                className={detailsUserStatus}
                twoToneColor="#52c41a"
              />
            ) : (
              <CloseCircleTwoTone
                className={detailsUserStatus}
                twoToneColor="#ff4f4f"
              />
            )}
          </Popover>
        }
        actions={[
          <LogoutOutlined
            onClick={() => {
              setConfirmVisible(true);
            }}
          />,
          // Чтобы создать видимость двух кнопок
          null,
        ]}
      >
        <section className={detailsCard}>
          <aside className={detailsCardAvatar}>
            <img src={user.avatar} alt="" />
          </aside>
          <section>
            <p className={detailsUserName}>
              {user.name} {user.surname}
            </p>
            <p className={detailsUserEmail}>
              <a href={`mailto:${user.email}`}>
                <MailOutlined /> {user.email}
              </a>
            </p>
            <p className={detailsUserPhone}>
              <a href={`tel:${user.phone}`}>
                <PhoneOutlined /> {user.phone}
              </a>
            </p>
          </section>
        </section>
      </Card>
      <Modal
        title="Подтверждение действия"
        visible={confirmVisible}
        onOk={() => {
          dispatch(logOut());
        }}
        onCancel={() => {
          setConfirmVisible(false);
        }}
        okText="Выйти"
        cancelText="Отмена"
      >
        <p>Вы уверены, что хотите выйти?</p>
      </Modal>
    </React.Fragment>
  ) : (
    <Spin size="large" />
  );
};
