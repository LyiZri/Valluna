import { InteractionOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tag } from "antd";
import React from "react";
interface IProps {
  search: Function;
  export: Function;
}

export default function searchBar(props: IProps) {
  const [form] = Form.useForm();
  const options = [{ value: 'Scholar',label:'Scholar' }, { value: 'Scholar Group A',label:'Scholar Group A' }, { value: 'Scholar Group B',label:'Scholar Group B' }, { value: 'Team Lead',label:'Team Lead' }];
  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
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
          <Col span={3} key={1}>
            <Form.Item name={"userId"}>
              <Input placeholder="User ID"></Input>
            </Form.Item>
          </Col>
          <Col span={3} key={2}>
            <Form.Item name={"userName"}>
              <Input placeholder="User Name"></Input>
            </Form.Item>
          </Col>
          <Col span={3} key={3}>
            <Form.Item name={"Email"}>
              <Input placeholder="Email"></Input>
            </Form.Item>
          </Col>
          <Col span={6} key={4}>
            <Form.Item name={"tag"}>
              <Select mode="multiple" tagRender={tagRender} options={options}>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3} key={5}>
            <Button icon={<InteractionOutlined />} className="bg-blue-500" htmlType="reset"></Button>
          </Col>
          <Col span={3} key={6}>
            <Button className="bg-blue-500" icon={<SearchOutlined />} htmlType="submit">
              Search
            </Button>
          </Col>
          <Col span={3} key={7}>
            <Button className="bg-blue-500" onClick={() => props.export()}>
              export
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
