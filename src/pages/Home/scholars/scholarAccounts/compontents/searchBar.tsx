import { InteractionOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
interface IProps {
  search: Function;
  export: Function;
}

export default function searchBar(props: IProps) {
  const [form] = useForm();
  const options = [{ value: 'Scholar',label:'Scholar' }, { value: 'Scholar Group A',label:'Scholar Group A' }, { value: 'Scholar Group B',label:'Scholar Group B' }, { value: 'Team Lead',label:'Team Lead' }];
  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded"
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <div>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        form={form}
        onFinish={(e) => {
          props.search(e);
        }}
      >
        <Row gutter={24}>
          <Col span={2}>
            <Form.Item name={"scholarId"}>
              <Input placeholder="Scholar ID"></Input>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name={"scholarAccountName"}>
              <Input placeholder="Scholar Account Name"></Input>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name={"wallet"}>
              <Input placeholder="Wallet"></Input>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Input placeholder="Email"></Input>
          </Col>
          <Col span={2}>
            <Form.Item name={"status"}>
              <Select mode="multiple" tagRender={tagRender} placeholder={"Status"} options={options}>
              </Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name={"tag"}>
              <Select mode="multiple" tagRender={tagRender} placeholder={"Tags"} options={options}>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name={"memberUserId"}>
              <Input placeholder="Member User ID"></Input>
            </Form.Item>
          </Col>
          <Col span={1}>
            <Button icon={<InteractionOutlined />} htmlType="reset"></Button>
          </Col>
          <Col span={2}>
            <Button icon={<SearchOutlined />} htmlType="submit">
            </Button>
          </Col>
          <Col span={2}>
            <Button className="bg-blue-500" onClick={() => props.export()}>
              export
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
