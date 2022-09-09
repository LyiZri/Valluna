import SearchBar from '@/compontents/Layout/SearchBar';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Modal, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

interface IProps {
  visible: boolean;
  setVisible: Function;
  tableData: IUserInfo[];
  setTableData: Function;
}
export default function AddUsers({
  visible,
  setVisible,
  tableData,
  setTableData,
}: IProps) {
  const [selectRowKey, setSelectRowKey] = useState<React.Key[]>();
  const addUsers = () => {
    let data: IUserInfo[] = [];
    console.log(selectRowKey);

    if (selectRowKey?.length !== 0) {
      selectRowKey?.forEach((item, _) => {
        console.log(item);
        data.push(tableData[Number(item)]);
      });
      console.log(data);
      const arr = data.concat(tableData);

      setTableData(arr);
    }
  };
  const tableColumns: ColumnsType<IUserInfo> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'User name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
      render: (_, { groups }) => {
        return (
          <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
            {groups}
          </Tag>
        );
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Discord ID',
      dataIndex: 'discordId',
      key: 'discordId',
    },
  ];
  const userTableData: IUserInfo[] = [
    // {
    //     userId:'1',
    //     userName:'2',
    //     email:'123',
    //     firstName:'E',
    //     lastName:'cas',
    //     groups:1,
    //     country:'china',
    //     discordId:'123123'
    // },
    // {
    //     userId:'2',
    //     userName:'2',
    //     email:'123',
    //     firstName:'E',
    //     lastName:'cas',
    //     groups:1,
    //     country:'china',
    //     discordId:'123123'
    // },
    // {
    //     userId:'3',
    //     userName:'2',
    //     email:'123',
    //     firstName:'E',
    //     lastName:'cas',
    //     groups:1,
    //     country:'china',
    //     discordId:'123123'
    // },
    // {
    //     userId:'4',
    //     userName:'2',
    //     email:'123',
    //     firstName:'E',
    //     lastName:'cas',
    //     groups:1,
    //     country:'china',
    //     discordId:'123123'
    // },
  ];

  const searchBarItem: IFormItem[] = [
    {
      name: 'scholarId',
      type: 'input',
      placeholder: 'Scholar ID',
      label: '',
      value: '',
      require: false,
    },
    {
      name: 'scholarAccountName',
      type: 'input',
      placeholder: 'Scholoar Account Name',
      label: '',
      value: '',
      require: false,
    },
    {
      name: 'wallet',
      type: 'input',
      placeholder: 'Wallet',
      label: '',
      value: '',
      require: false,
    },
    {
      name: 'email',
      type: 'input',
      placeholder: 'Email',
      label: '',
      value: '',
      require: false,
    },
    {
      name: 'groups',
      type: 'select',
      placeholder: 'Grops',
      selectOption: [
        { value: 1, text: '12312313' },
        { value: 2, text: '12312312' },
      ],
      label: '',
      value: '',
      require: false,
    },
    {
      name: 'action',
      type: 'button',
      label: '',
      value: '',
      require: false,
      render: (
        <>
          <Button icon={<UndoOutlined />} htmlType="reset"></Button>
        </>
      ),
    },
    {
      name: 'action1',
      type: 'button',
      label: '',
      value: '',
      require: false,
      render: (
        <>
          <Button icon={<SearchOutlined />} htmlType="submit"></Button>
        </>
      ),
    },
    {
      name: 'action2',
      type: 'button',
      label: '',
      value: '',
      require: false,
      render: (
        <>
          <Button className="bg-primary" type="primary" onClick={addUsers}>
            Add
          </Button>
        </>
      ),
    },
  ];
  const onSelectChange = (e: React.Key[]) => {
    console.log(e);
    setSelectRowKey(e);
  };
  const rowSelection = {
    selectRowKey,
    onChange: onSelectChange,
  };
  return (
    <Modal
      width={1300}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      title="Select Member Account"
    >
      <h6>Select Member Accounts to upload to Group</h6>
      <SearchBar search={() => {}} searchItem={searchBarItem} />
      <Table
        rowSelection={rowSelection}
        columns={tableColumns}
        dataSource={userTableData}
        rowKey={'userId'}
      ></Table>
    </Modal>
  );
}
