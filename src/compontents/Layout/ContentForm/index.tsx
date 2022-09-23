import React from 'react';
// import { Form, Input } from "antd";
import CountryValue from '@/assets/json/language.json';
import UserGroupsTag from '@/compontents/User/UserGroupsTag';
import { IFormItem, ISelectOption } from '@/types/form';
import { Form, Input, Radio, Select, Space } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';
import IconFont from '../IconFont';
import { getCountryName } from '../../../utils/format';
interface IProps {
  onFinish: Function;
  formItem?: IFormItem[];
  children?: React.ReactNode;
  layoutObj?: object;
  layout?: FormLayout;
  form?: any;
  initialValues?: Object;
  className?: string;
}
export default function ContentForm({
  onFinish,
  formItem,
  className,
  children,
  layoutObj = { labelCol: { span: 4 }, wrapperCol: { span: 12 } },
  layout,
  form,
  initialValues = {},
}: IProps) {
  return (
    <Form
      layout={layout}
      {...layoutObj}
      form={form}
      initialValues={initialValues}
      labelAlign="left"
      onFinish={(e) => onFinish(e)}
      className={className}
    >
      {formItem &&
        formItem.map((item: IFormItem, index: number) => {
          if (item.render) {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                className={'text-white'}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                {item.render}
              </Form.Item>
            );
          }
          if (item.type === 'radio') {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <Radio.Group value={1} disabled={item.disabled}>
                  <Space direction="vertical">
                    {item.selectOption?.map(
                      (item: ISelectOption, index: number) => {
                        return (
                          <Radio
                            key={item.value}
                            className="text-white"
                            value={item.value}
                          >
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
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={
                  item.require
                    ? [
                        { required: true, message:'' },
                        { validator: item.validator },
                      ]
                    : [{ required: false }]
                }
              >
                <Input
                  className={`bg-input-content text-white rounded-none ${item.className}`}
                  disabled={item.disabled}
                  value={item.value as string | number}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }
          if (item.type == 'button') {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                {item.children}
              </Form.Item>
            );
          }
          if (item.type == 'password') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={
                  item.require
                    ? [
                        { required: true, message: '' },
                        { validator: item.validator },
                      ]
                    : [{ required: false }]
                }
              >
                <Input.Password
                iconRender={(visible:boolean)=>{
                  return visible?<IconFont type="icon-yanjing_xianshi"></IconFont>:<IconFont type="icon-yanjing_yincang"></IconFont>
                }}
                  placeholder={item.placeholder}
                  className={`border-none bg-input-content text-white ${item.className}`}
                  disabled={item.disabled}
                  value={item.value as string | number}
                ></Input.Password>
              </Form.Item>
            );
          }
          if (item.type == 'repassword') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message:'' },{validator:(rules:any,value:string,callback:Function)=>{
                  if(form.getFieldsValue().password == value){
                    callback()
                  }else if(value == "" || !value){
                    callback("Please re-enter the password")
                  }else{
                    callback("Passwords do not match")
                  }
                  
                }}]}
              >
                <Input.Password
                  placeholder={item.placeholder}
                  className={`border-none bg-input-content text-white ${item.className}`}
                  disabled={item.disabled}
                  iconRender={(visible:boolean)=>{
                    return visible?<IconFont type="icon-yanjing_xianshi"></IconFont>:<IconFont type="icon-yanjing_yincang"></IconFont>
                  }}
                  value={item.value as string | number}
                ></Input.Password>
                
              </Form.Item>
            );
          }
          if (item.type == 'select') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
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

          if (item.type == 'country') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <Select
                  className={`text-left ${item.className}`}
                  placeholder="Country"
                  disabled={item.disabled}
                >
                  {CountryValue.map((item1, index) => {
                    return (
                      <Select.Option key={item1.code} value={item1.code}>
                        {item1.english}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            );
          }
          if (item.type == 'userGroups') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <UserGroupsTag
                  className="px-4 py-1"
                  tagType={item.value as string}
                />
              </Form.Item>
            );
          }
        })}
      {children}
    </Form>
  );
}
