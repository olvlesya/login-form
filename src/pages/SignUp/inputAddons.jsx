import React from "react";
import { Form, Select } from "antd";

export const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="+7">+7</Select.Option>
    </Select>
  </Form.Item>
);
