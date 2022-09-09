import React from 'react';
// import { Form, Input } from "antd";
import { IFormItem, ISelectOption } from '@/types/form';
import { Form, Input, Radio, Select, Space } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';
// import { FormInstance } from "antd/es/form/Form";
import UserGroupsTag from '@/compontents/User/UserGroupsTag'
interface IProps {
  onFinish: Function;
  formItem?: IFormItem[];
  children?: React.ReactNode;
  layoutObj?: object;
  layout?:FormLayout;
  form?: any;
  initialValues?:Object
}
export default function ContentForm({
  onFinish,
  formItem,
  children,
  layoutObj = { labelCol: { span: 4 }, wrapperCol: { span: 12 } },
  layout,
  form,
  initialValues={}
}: IProps) {
  return (
    <Form
      layout={layout}
      {...layoutObj}
      form={form}
      initialValues={initialValues}
      labelAlign="left"
      onFinish={(e) => onFinish(e)}
    >
      {formItem&&formItem.map((item: IFormItem, index: number) => {
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
        }
        if (item.type === 'radio') {
          return (
            <Form.Item
              key={index}
              name={item.name}
              label={item.label}
              rules={[{ required: item.require }]}
            >
              <Radio.Group value={1} disabled={item.disabled}>
                <Space direction="vertical">
                  {item.selectOption?.map(
                    (item: ISelectOption, index: number) => {
                      return (
                        <Radio key={item.value} value={item.value}>
                          {item.text}
                        </Radio>
                      );
                    },
                  )}
                </Space>
              </Radio.Group>
            </Form.Item>
          );
        }
        if (item.type === 'input') {
          return (
            <Form.Item
              key={index}
              name={item.name}
              label={item.label}
              rules={[{ required: item.require }]}
            >
              <Input className=" bg-input-content text-white rounded-none"  disabled={item.disabled} value={item.value as string|number} placeholder={item.placeholder}/>
            </Form.Item>
          );
        }
        if (item.type == 'button') {
          return (
            <Form.Item
              key={index}
              name={item.name}
              label={item.label}
              rules={[{ required: item.require }]}
            >
              {item.children}
            </Form.Item>
          );
        }
        if (item.type == 'password') {
          return (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.label}
              rules={[{ required: item.require }]}
            >
              <Input.Password className=" border-none bg-input-content text-white w-full" disabled={item.disabled} value={item.value as string|number}></Input.Password>
            </Form.Item>
          );
        }
        if (item.type == 'select') {
          return (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.label}
              rules={[{ required: item.require }]}
            >
              <Select placeholder={item.placeholder} disabled={item.disabled}>
                {item.selectOption?.map(
                  (selectIthem: ISelectOption, selcetIndex: number) => {
                    return (
                      <Select.Option
                        key={selcetIndex}
                        value={selectIthem.value}
                      >
                        {selectIthem.text}
                      </Select.Option>
                    );
                  },
                )}
              </Select>
            </Form.Item>
          );
        }
        if(item.type == "userGroups"){
          return (
            <Form.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={[{ required: item.require }]}
          >
            <UserGroupsTag className='px-4 py-1' tagType={(item.value as string)}/>
          </Form.Item>
          )
        }
      })}
      {children}
    </Form>
  );
}
