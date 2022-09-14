import IconFont from '@/compontents/Layout/IconFont';
import { IFormItem } from '@/types/form';
import { searchStatusData, userGroupsData } from '@/types/user';
import { Button, Col, Form, Input, Row, Select, Tag } from 'antd';
import React from 'react';
interface IProps {
  search: Function;
  searchItem: IFormItem[];
}

export default function searchBar(props: IProps) {
  const [form] = Form.useForm();
  const tagRender = (props: any) => {
    const { label, value, color, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={'#30373F'}
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
          {props.searchItem.map((item, index) => {
            if (item.render) {
              return (
                <Form.Item
                  key={index}
                  name={item.name}
                  label={item.label}
                  className={'text-white'}
                  rules={[{ required: item.require }]}
                >
                  {item.render}
                </Form.Item>
              );
            } else if (item.type === 'input') {
              return (
                <Col span={item.col} key={item.name}>
                  <Form.Item name={item.name}>
                    <Input
                      className="mb-4 bg-input-content text-white rounded-lg"
                      value={item.value as string}
                      placeholder={item.placeholder}
                    />
                  </Form.Item>
                </Col>
              );
            } else if (item.type == 'groups-select') {
              return (
                <Col span={item.col} key={item.name}>
                  <Form.Item
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.require }]}
                  >
                    <Select
                      placeholder={item.placeholder}
                      className="bg-input-content rounded-lg"
                      dropdownClassName={'text-white'}
                      mode="multiple"
                      tagRender={tagRender}
                      options={userGroupsData}
                    ></Select>
                  </Form.Item>
                </Col>
              );
            } else if (item.type == 'status-groups') {
              return (
                <Col span={item.col} key={item.name}>
                  <Form.Item
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.require }]}
                  >
                    <Select
                      placeholder={item.placeholder}
                      className="bg-input-content rounded-lg"
                      dropdownClassName={'text-white'}
                      mode="multiple"
                      options={searchStatusData}
                    ></Select>
                  </Form.Item>
                </Col>
              );
            } else if (item.type == 'link-reset') {
              return (
                <Col span={item.col} key={item.icon}>
                  <Button type="link" htmlType="reset">
                    <IconFont
                      type={item.icon as string}
                      className="cursor-pointer text-white text-2xl"
                      onClick={() => {
                        () => form.resetFields([]);
                      }}
                    ></IconFont>
                  </Button>
                </Col>
              );
            } else if (item.type == 'link-submit') {
              return (
                <Col span={item.col} key={item.icon}>
                  <Button type="link" htmlType="submit">
                    <IconFont
                      type={item.icon as string}
                      className="cursor-pointer text-white text-2xl"
                    ></IconFont>
                  </Button>
                </Col>
              );
            } else if (item.type == 'col') {
              return <Col span={item.col} key={item.name}></Col>;
            }
          })}
        </Row>
      </Form>
    </div>
  );
}
