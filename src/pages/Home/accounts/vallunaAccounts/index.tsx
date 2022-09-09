import SearchBar from '@/compontents/Layout/SearchBar';
import { getMembersList } from '@/services/members';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { downloadCsv } from '@/utils/downloadFile';
import { timestampToTime } from '@/utils/format';
import { useModel } from '@umijs/max';
import { Button, PaginationProps, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import UserGroups from '@/compontents/User/UserGroupsTag';
import  IconFont  from '@/compontents/Layout/IconFont';
import {itemRender} from '@/compontents/Layout/PageContaineriTemRender'

interface DataType extends IUserInfo {}

export default function Accounts() {
  const [list, setList] = useState<DataType[]>([]);
  let [pageData,setPageData] = useState({
    size:10,
    amount: 10,
  });
  let pageNum = 1
  let searchData = {
    uid: '',
    username: '',
    email: '',
    groups: [],
  };
  const [loading, setloading] = useState(false);
  const { accountsInfoData, setAccountsInfoData } = useModel(
    'accountsInfo',
    (model: any) => ({
      accountsInfoData: model.accountsInfoData,
      setAccountsInfoData: model.setAccountsInfoData,
    }),
  );
  const exportCsv = () => {
    let titleArr: any[] = [];
    let keyArr: any[] = [];
    colums.map((item) => {
      if (item.title != 'Action') {
        titleArr.push(item.title);
        keyArr.push(item.key);
      }
    });
    downloadCsv(list, titleArr, keyArr);
  };
  const searchItem: IFormItem[] = [
    {
      name: 'uid',
      type: 'input',
      col: 3,
      placeholder:'User ID'
    },
    {
      name: 'username',
      type: 'input',
      col: 3,
      placeholder:'User Name'
    },
    {
      name: 'email',
      type: 'input',
      col: 3,
      placeholder:'Email'
    },
    {
      name: 'groups',
      type: 'groups-select',
      col: 8,
      placeholder:'Groups'
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
      name:'col',
      type:'col',
      col:3
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button
          className="  border-none rounded-lg bg-purple-button hover:bg-purple-800 hover:text-white  text-white"
          onClick={exportCsv}
        >
          export
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
          return <p>{country}</p>;
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
    {
      title: 'Sign up Date',
      dataIndex: 'regit_time',
      key: 'regit_time',
      render: (_, { regit_time }) => {
        if (regit_time) {
          return <p>{timestampToTime(regit_time)}</p>;
        } else {
          return <p>-</p>;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="link"
              className="text-white"
              onClick={() => {
                setAccountsInfoData(record);
                history.push(
                  '/accounts/valluna-accounts/account-details?uid=' +
                    record.uid,
                );
              }}
            >
              View More
            </Button>
          </Space>
        );
      },
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const search = async (values: any) => {
    searchData = values;
    await getList();
  };
  const getList = async () => {
    setloading(true);
    try {
      console.log(pageData);
      
      const data = await getMembersList({
        page: pageNum,
        size: '10',
        ...searchData,
      });
      setPageData({
        ...pageData,
        amount:data.data.amount
      })
      setList(data.data.list);
    } catch (error) {}
    setloading(false);
  };
  useEffect(() => {
    (async () => {
      getList();
    })();
  }, []);
  return (
    <div className="mt-10  mr-10">
      <h3 className="text-gray-400 mb-5">
        This portal displays all current Vallna Member Accounts
      </h3>
      <SearchBar search={search} searchItem={searchItem} />
      <Table
        rowClassName={'bg-bar-bg text-white bg-card-bg'}
        loading={loading}
        rowSelection={rowSelection}
        rowKey={'uid'}
        columns={colums}
        dataSource={list}
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: 10,
          itemRender:itemRender,
          total: pageData.amount,
          onChange: (e) => {
            pageNum = e
            getList();
          },
        }}
      ></Table>
    </div>
  );
}
