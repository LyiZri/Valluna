import ButtonControlBar from '@/compontents/Profession/ButtonControlBar';
import { IButtonItem } from '@/types/form';
import { timestampToTime } from '@/utils/format';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import ContentCard from '@/compontents/Layout/ContentCard/index';
import { useState } from 'react';
import { IUserInfo } from '@/types/user';
import { getGroupsList } from '@/services/groups';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import { useEffect } from 'react';
import IconFont from '@/compontents/Layout/IconFont';
interface DataType extends IUserInfo{}
export default function userGroups() {
  const [list, setList] = useState<IUserInfo[]>([]);
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  let pageNum = 1;
  const {groupInfo,setGroupInfo} = useModel("groupsInfo")
  const getList = async () =>{
    const data = await getGroupsList({ ...pageData, page: pageNum });
    if (data.code == 1) {
      setList(data.data.list);
    }
  }
  useEffect(()=>{
    (async()=>{
      await getList()
    })()
  },[])
  const searchBarItem: IButtonItem[] = [
    {
      context: 'Create User Tag',
      type: 'primary',
      method: () => {
        setGroupInfo({})
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
      dataIndex: 'gid',
      key: 'gid',
    },
    {
      title: 'User Tag Name',
      dataIndex: 'gname',
      key: 'gname',
    },
    {
      title: 'Account Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => {
        if(type == 1){
          return <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
          Member</Tag>;
        }else{
          return <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
            Scholar
          </Tag>
        }
      },
    },
    {
      title: 'No. of Users',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Creation Date',
      dataIndex: 'regit_time',
      key: 'regit_time',
      render: (_, { regit_time }) => {
        return <p>{timestampToTime(regit_time as string)}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <IconFont onClick={()=>{
              setGroupInfo(record)
              history.push(`/accounts/user-groups/create-user-tag?gid=${record.gid}`)
            }} type='icon-bianji' className='text-2xl cursor-pointer'></IconFont>
            <IconFont  type='icon-shanchu' className='text-2xl cursor-pointer'></IconFont>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <h2 className='text-2xl'></h2>
      <ContentCard label="create userTags to help manage your Guild members and scholars">
        <ButtonControlBar
          title="Create and assign User Tags"
          buttonContent={searchBarItem}
        ></ButtonControlBar>
        <Table
        rowClassName={'bg-bar-bg text-white bg-card-bg'}
          rowKey={'gid'}
          columns={tableColums}
          dataSource={list}
          pagination={{
            pageSize: 10,
            itemRender: itemRender,
            total: pageData.size,
            onChange: (e) => {
              pageNum = e;
              getList();
            },
          }}
        ></Table>
      </ContentCard>
    </div>
  );
}
