import IconFont from '@/compontents/Layout/IconFont';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import UserGroups from '@/compontents/User/UserGroupsTag';
import { getMembersList } from '@/services/members';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { DeleteOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useEffect } from 'react';

interface DataType extends IUserInfo {}
interface IProps {
  visible: boolean;
  setVisible: Function;
  addArr: IUserInfo[];
  setAddArr: Function;
}
export default function AddUsers({
  visible,
  setVisible,
  addArr,
  setAddArr
}: IProps) {
  const [selectRowKey, setSelectRowKey] = useState<React.Key[]>();
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
  const getList = async () =>{
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
  }
  const search = async (values: any) => {
    searchData = values;
    await getList();
  };
  const onAdd = ()=>{
    const selectArr:IUserInfo[] = []
    if(!selectRowKey||selectRowKey.length == 0){
      setVisible(false)
      return 
    }
    list.map((item1,index1)=>{
      selectRowKey?.map((item2,index2)=>{
        if(item2 == item1.uid){
          selectArr.push(item1)
        }
      })
    })
    //数组去重
    setAddArr(Array.from(new Set(addArr.concat(selectArr))));
    setVisible(false)
  }
  useEffect(()=>{
    (async()=>{
      await getList()
    })()
  },[])

  const tableColums: ColumnsType<IUserInfo> = [
    {
      title: 'User ID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      title: 'Groups',
      dataIndex: 'groups',
      key: 'groups',
      render: (_, { groups }) => {
        return <UserGroups tagType={groups as string}></UserGroups>;
      },
    },
    {
      title:"Country",
      key:"country",
      dataIndex:"country",
      render:(_,{country})=>{
        return country?country:"-"
      }
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
  const searchItem: IFormItem[] = [
    {
      name: 'uid',
      type: 'input',
      placeholder: 'User ID',
      label: '',
      value: '',
      col:3,
      require: false,
    },
    {
      name: 'scholarAccountName',
      type: 'input',
      placeholder: 'User Name',
      label: '',
      value: '',
      col:3,
      require: false,
      
    },
    {
      name: 'email',
      type: 'input',
      placeholder: 'Email',
      label: '',
      value: '',
      col:3,
      require: false,
    },
    {
      name: 'groups',
      type: 'groups-select',
      col: 3,
      placeholder:'Groups'
    },
    {
      name: 'col',
      type: 'col',
      col: 6,
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
      name: 'action2',
      type: 'button',
      label: '',
      value: '',
      require: false,
      render: (
        <>
        <Button onClick={onAdd} className="ml-4  border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white" >Add</Button>
        </>
      ),
    },
  ];
  const onSelectChange = (e: React.Key[]) => {
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
      className="text-center"
      closeIcon={<IconFont type="icon-close" className="text-2xl"></IconFont>}
    >
      <h2 className='w-full text-center text-white text-2xl mb-4'>Select Member Account</h2>
      <h6 className='w-full text-center text-white text-xl mb-4'>Select Member Accounts to upload to Group</h6>
      <SearchBar search={search} searchItem={searchItem} />
      <Table
      rowClassName={'bg-bar-bg text-white bg-card-bg'}
        rowSelection={rowSelection}
        columns={tableColums}
        dataSource={list}
        rowKey={'uid'}
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
    </Modal>
  );
}
