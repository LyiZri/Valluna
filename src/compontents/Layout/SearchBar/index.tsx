import IconFont from '@/compontents/Layout/IconFont';
import { IFormItem } from '@/types/form';
import { searchStatusData, userGroupsData } from '@/types/user';
import { Button, Form, Input, Select, Tag } from 'antd';
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
        className="ant-advanced-search-form flex justify-between"
        form={form}
        onFinish={(e) => {
          props.search(e);
        }}
      >
        <div className='flex'>
        {props.searchItem.map((item, index) => {
          if (item.type === 'input') {
            return (
              <Form.Item  key={item.name} name={item.name}>
                <Input
                  className=" bg-input-content text-white rounded-lg w-32 mr-4"
                  value={item.value as string}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          } else if (item.type == 'groups-select') {
            return (
              <Form.Item
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require }]}
              >
                <Select
                  placeholder={item.placeholder}
                  className="bg-input-content  mr-4 rounded-lg !w-32"
                  dropdownClassName={'text-white'}
                  mode="multiple"
                  tagRender={tagRender}
                  options={userGroupsData}
                ></Select>
              </Form.Item>
            );
          } else if (item.type == 'status-groups') {
            return (
              <Form.Item
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require }]}
              >
                <Select
                  placeholder={item.placeholder}
                  className="bg-input-content mr-4 rounded-lg !w-32"
                  dropdownClassName={'text-white'}
                  mode="multiple"
                  options={searchStatusData}
                ></Select>
              </Form.Item>
            );
          }
        })}
        </div>
        <div className='flex'>
        {props.searchItem.map((item, index) => {
          if (item.type == 'link-reset') {
            return (
              <Button key={index} type="link" htmlType="reset" className='px-1'>
                <div className='px-1 rounded bg-gray-500'>
                <IconFont
                  type={item.icon as string}
                  className="cursor-pointer text-white text-xl"
                  onClick={() => {
                    () => form.resetFields([]);
                  }}
                  ></IconFont>
                  </div>
              </Button>
            );
          } else if (item.type == 'link-submit') {
            return (
              <Button key={index} type="link" htmlType="submit" className='px-1'>
                <div className='px-1 rounded bg-gray-500'>
                <IconFont
                  type={item.icon as string}
                  className="cursor-pointer text-white text-xl"
                  ></IconFont>
                  </div>
              </Button>
            );
          } else if (item.render) {
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
        })}
        </div>
      </Form>
    </div>
  );
}
