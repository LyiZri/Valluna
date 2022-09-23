import ContentEmpty from '@/compontents/Layout/ContentEmpty';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import UserGroups from '@/compontents/User/UserGroupsTag';
import { getMembersList } from '@/services/members';
import { unLinkScholarItem } from '@/services/scholars';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { Button, message } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { getCountryName } from '../../../../../utils/format';
interface DataType extends IUserInfo {}
interface IProps {
  memberUserId: string;
}

export default function linkTable({ memberUserId }: IProps) {
  const [list, setList] = useState<DataType[]>([]);
  const [loadingStatus, setLoadingStatus] = useState({
    tableLoading: false,
    linkLoading: false,
  });
  let [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  let pageNum = 1;
  let searchData = {
    userid: '',
    username: '',
    email: '',
    groups: [],
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    type: 'radio',
    onChange: onSelectChange,
  };

  const getList = async () => {
    setLoadingStatus({
      ...loadingStatus,
      tableLoading: true,
    });
    try {
      const data = await getMembersList({
        ...searchData,
        uid: memberUserId,
        page: pageNum,
        size: '10',
      });
      setPageData({
        ...pageData,
        amount: data.data.amount,
      });
      setLoadingStatus({
        ...loadingStatus,
        tableLoading: false,
      });
      return data.data.list;
    } catch (error) {
      setLoadingStatus({
        ...loadingStatus,
        tableLoading: false,
      });
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getList();
      setList(res);
    })();
  }, []);
  const search = async (values: any) => {
    searchData = values;
    const res = await getList();
    setList(res);
  };
  const linkItem = async () => {
    setLoadingStatus({
      ...loadingStatus,
      linkLoading:true
    })
    const sid = list[(selectedRowKeys[0] as number) - 1].scholarid;
    const uid = list[(selectedRowKeys[0] as number) - 1].uid;
    const data = await unLinkScholarItem({ sid, uid, type: 'link' });
    setLoadingStatus({
      ...loadingStatus,
      linkLoading:false
    })
    if (data.code == 1) {
      message.success('success');
    }
  };
  const pageChange = async (e: any) => {
    if (list.length > (e - 1) * 10) {
      pageNum = e;
    } else {
      pageNum = e;
      const res = await getList();
      setList(list.concat(res));
    }
  };
  const searchItem: IFormItem[] = [
    {
      name: 'uid',
      type: 'input',
      col: 3,
      placeholder: 'User ID',
    },
    {
      name: 'username',
      type: 'input',
      col: 3,
      placeholder: 'User Name',
    },
    {
      name: 'email',
      type: 'input',
      col: 3,
      placeholder: 'Email',
    },
    {
      name: 'groups',
      type: 'groups-select',
      col: 3,
      placeholder: 'Groups',
    },
    {
      name: 'col',
      type: 'col',
      col: 7,
    },
    {
      name: '',
      type: 'link-reset',
      col: 1,
      icon: 'icon-shuaxin',
    },
    {
      name: '',
      type: 'link-submit',
      col: 1,
      icon: 'icon-chazhao',
    },

    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button
          onClick={linkItem}
          loading={loadingStatus.linkLoading}
          className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
        >
          Link
        </Button>
      ),
    },
  ];

  const colums: ColumnsType<DataType> = [
    {
      title: 'User ID',
      dataIndex: 'uid',
      key: 'uid',
      render: (_, { uid }) => {
        return uid ? <p>{uid}</p> : <>-</>;
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      render: (_, { username }) => {
        return username ? <p>{username}</p> : <>-</>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, { email }) => {
        return email ? <p>{email}</p> : <>-</>;
      },
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (_, { firstname }) => {
        return firstname ? <p>{firstname}</p> : <>-</>;
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      render: (_, { lastname }) => {
        return lastname ? <p>{lastname}</p> : <>-</>;
      },
    },
    {
      title: 'Tag',
      dataIndex: 'groups',
      key: 'groups',
      render: (_, { groups }) => {
        return <UserGroups tagType={groups as string}></UserGroups>;
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (_, { country }) => {
        if (country) {
          return <p>{getCountryName(country)}</p>;
        } else {
          return <>-</>;
        }
      },
    },
    {
      title: 'Discord ID',
      dataIndex: 'discordid',
      key: 'discordid',
      render: (_, { discordid }) => {
        return discordid ? <p>{discordid}</p> : <>-</>;
      },
    },
  ];
  return (
    <div className="">
      <p className="mb-2 text-2xl">Scholar Account Overview</p>

      <h3 className="text-gray-400 mb-12">
        Scholar Account ID : {memberUserId} <br /> Select a Member Account to
        link to
      </h3>
      <SearchBar search={search} searchItem={searchItem} />
      <ContentEmpty>
        <Table
          rowClassName={'bg-bar-bg text-white bg-card-bg'}
          loading={loadingStatus.tableLoading}
          rowSelection={rowSelection}
          rowKey={'uid'}
          columns={colums}
          dataSource={list}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            itemRender: itemRender,
            total: pageData.amount,
            onChange: (e) => {
              pageChange(e);
            },
          }}
        />
      </ContentEmpty>
    </div>
  );
}
