import React, { useState } from "react";
import { Card, Popover, Modal } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LogoutOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/actions";
import {
  detailsUserName,
  detailsUserEmail,
  detailsUserPhone,
  detailsUserTitle,
  detailsUserStatus,
} from "./Details.module.scss";

export const Details = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [confirmVisible, setConfirmVisible] = useState(false);
  return (
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
              user.user.is_active
                ? "Пользователь активен"
                : "Пользователь неактивен"
            }
          >
            {user.user.is_active ? (
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
        <p className={detailsUserName}>
          {user.name} {user.surname}
        </p>
        <p className={detailsUserEmail}>
          <a href={`mailto:${user.user.email}`}>
            <MailOutlined /> {user.user.email}
          </a>
        </p>
        <p className={detailsUserPhone}>
          <a href={`tel:${user.phone}`}>
            <PhoneOutlined /> {user.phone}
          </a>
        </p>
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
  );
};
