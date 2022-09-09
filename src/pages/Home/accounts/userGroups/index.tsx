import ButtonControlBar from '@/compontents/Profession/ButtonControlBar';
import { IButtonItem } from '@/types/form';
import { timestampToTime } from '@/utils/format';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import ContentCard from '@/compontents/Layout/ContentCard/index';
interface DataType {
  userTagID: string | Number;
  userTagName: string;
  accountType: string;
  noOfUsers: number;
  creationDate: string;
}
export default function userGroups() {
  const searchBarItem: IButtonItem[] = [
    {
      context: 'Create User Tag',
      type: 'primary',
      method: () => {
        console.log(123);
        history.push('/accounts/user-groups/create-user-tag');
      },
    },
    {
      context: 'Mass Upload',
      type: 'primary',
      method: () => {},
    },
    {
      context: 'Mass Remove',
      type: 'primary',
      method: () => {},
    },
  ];

  const tableColums: ColumnsType<DataType> = [
    {
      title: 'User Tag ID',
      dataIndex: 'userTagID',
      key: 'userTagID',
    },
    {
      title: 'User Tag Name',
      dataIndex: 'userTagName',
      key: 'userTagName',
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (_, { accountType }) => {
        return <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
          {accountType}</Tag>;
      },
    },
    {
      title: 'No. of Users',
      dataIndex: 'noOfUsers',
      key: 'noOfUsers',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (_, { creationDate }) => {
        return <p>{timestampToTime(creationDate)}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <EditOutlined className="cursor-pointer mx-3" />
            <DeleteOutlined className="cursor-pointer" />
          </Space>
        );
      },
    },
  ];
  const data: DataType[] = [
    {
      userTagID: 1,
      userTagName: 'A',
      accountType: 'Scholar',
      noOfUsers: 20,
      creationDate: '1660791192000',
    },
    {
      userTagID: 2,
      userTagName: 'B',
      accountType: 'Member',
      noOfUsers: 20,
      creationDate: '1660791192000',
    },
  ];

  return (
    <div>
      <ContentCard label="create userTags to help manage your Guild members and scholars">
        <ButtonControlBar
          title="Create and assign User Tags"
          buttonContent={searchBarItem}
        ></ButtonControlBar>
        <Table
          rowKey={'userTagID'}
          columns={tableColums}
          dataSource={data}
        ></Table>
      </ContentCard>
    </div>
  );
}
