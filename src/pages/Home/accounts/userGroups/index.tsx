import ContentEmpty from '@/compontents/Layout/ContentEmpty';
import IconFont from '@/compontents/Layout/IconFont';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import ButtonControlBar from '@/compontents/Profession/ButtonControlBar';
import UploadModal from '@/compontents/Profession/UploadModal';
import {
  getGroupsList,
  groupMassRemove,
  groupMassUpload,
  groupRemoveItem,
} from '@/services/groups';
import { IButtonItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { timestampToTime } from '@/utils/format';
import { history, useModel } from '@umijs/max';
import { Button, Space, Tag, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
interface DataType extends IUserInfo {}
export default function userGroups() {
  const [list, setList] = useState<IUserInfo[]>([]);
  const [uploadModalStatus, setUploadModalStatus] = useState(false);
  const [removeModalStatus, setRemoveModalStatus] = useState(false);
  const [deleteModalValue,setDeleteModalValue] = useState({
    status:false,
    id:'',
    loading:false
  })
  const [loadingStatus, setLodaingStatus] = useState({
    table: false,
  });
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  let searchData = {
    gid: '',
    gname: '',
    type: 0,
  };
  let pageNum = 1;
  const { groupInfo, setGroupInfo } = useModel('groupsInfo');
  const getList = async () => {
    setLodaingStatus({
      ...loadingStatus,
      table: true,
    });
    const data = await getGroupsList({
      ...pageData,
      page: pageNum,
      ...searchData,
    });
    if (data.code == 1) {
      setList(data.data.list);
    }
    setLodaingStatus({
      ...loadingStatus,
      table: false,
    });
  };
  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);
  const searchBarItem: IButtonItem[] = [
    {
      context: 'Create User Tag',
      type: 'primary',
      method: () => {
        setGroupInfo({});
        history.push('/accounts/user-groups/create-user-tag');
      },
    },
    {
      context: 'Mass Upload',
      type: 'primary',
      method: () => {
        setUploadModalStatus(true);
      },
    },
    {
      context: 'Mass Remove',
      type: 'primary',
      method: () => {
        setRemoveModalStatus(true)
      },
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
        if (type == 1) {
          return (
            <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
              Member
            </Tag>
          );
        } else {
          return (
            <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
              Scholar
            </Tag>
          );
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
            <IconFont
              onClick={() => {
                setGroupInfo(record);
                history.push(
                  `/accounts/user-groups/create-user-tag?gid=${record.gid}`,
                );
              }}
              type="icon-bianji"
              className="text-2xl cursor-pointer"
            ></IconFont>
            <IconFont
              type="icon-shanchu"
              onClick={()=>setDeleteModalValue({
                ...deleteModalValue,
                status:true,
                id:(record.gid as string)
              })}
              className="text-2xl cursor-pointer"
            ></IconFont>
          </Space>
        );
      },
    },
  ];
  const searchItem = [
    {
      name: 'gid',
      type: 'input',
      placeholder: 'User Group ID',
    },
    {
      name: 'gname',
      type: 'input',
      col: 2,
      placeholder: 'User Group Name',
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
  ];
  const search = async (value: any) => {
    searchData = value;
    await getList();
  };
  const buttonSeatch = async (type: number) => {
    searchData.type = type;
    await getList();
  };
  const deleteConfirm = async () =>{
    setDeleteModalValue({
      ...deleteModalValue,
      loading:true
    })
    const data = await groupRemoveItem({gid:deleteModalValue.id})
    await getList()
    setDeleteModalValue({
      loading:false,
      status:false,
      id:''
    })
    
  }
  return (
    <div className="mt-10  mr-10">
      <h1 className="text-white text-2xl mb-2 font-semibold">
        User Group Overview{' '}
      </h1>
      <ButtonControlBar
        title={
          <div className="text-gray-400 mb-5">
            Create user Groups to help manage your Guild members and scholars{' '}
            <br />
            Create and assign User Groups
          </div>
        }
        buttonContent={searchBarItem}
      ></ButtonControlBar>
      <div className="mb-2">
        <Button
          onClick={() => buttonSeatch(0)}
          className=" bg-gray-button px-4 mr-2 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
        >
          All User Groups
        </Button>
        <Button
          onClick={() => buttonSeatch(1)}
          className=" bg-gray-button px-4 mr-2 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
        >
          Member Groups
        </Button>
        <Button
          onClick={() => buttonSeatch(2)}
          className=" bg-gray-button px-4 mr-2 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
        >
          Scholar Groups
        </Button>
      </div>
      <div className="rounded-xl" style={{ background: '#1e1e21' }}>
        <div className="pt-4 px-2">
          <SearchBar search={search} searchItem={searchItem} />
        </div>
        <ContentEmpty>
          <Table
            rowClassName={' text-white bg-card-bg'}
            rowKey={'gid'}
            columns={tableColums}
            loading={loadingStatus.table}
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
          />
        </ContentEmpty>
      </div>
      <UploadModal
        setUploadModalStatus={setUploadModalStatus}
        uploadModalStatus={uploadModalStatus}
        title="Mass Upload Accounts  from User Group"
        label="Upload multiple accounts to different User Group in the same .csv upload"
        uploadFunction={groupMassUpload}
        templateValue={[
          ['User Group ID*,User ID,Scholar ID'],
          ['1', '3', ''],
          ['2', '', '4'],
        ]}
      />
      <UploadModal
        setUploadModalStatus={setRemoveModalStatus}
        uploadModalStatus={removeModalStatus}
        title="Mass Remove Accounts to User Group "
        label="Remove multiple accounts from different User Groups in the same .csv upload"
        uploadFunction={groupMassRemove}
        templateValue={[
          ['User Group ID*,User ID,Scholar ID'],
          ['1', '3', ''],
          ['2', '', '4'],
        ]}
      />
      <Modal
      visible={deleteModalValue.status}
      footer={null}>
       <div className='text-center'>
          <p className="text-2xl text-white ">Confirmation </p>
          <p className="text-xl my-32 text-white">
            Are you sure you wish to delete User Tag ID  {deleteModalValue.id}?
          </p>
          <div className="px-12 mt-32 flex justify-between">
            <Button onClick={()=>setDeleteModalValue({
              ...deleteModalValue,
              status:false
            })} className="px-12 bg-gray-button hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white">
              Cancel
            </Button>
            <Button
            loading={deleteModalValue.loading}
              onClick={deleteConfirm}
              className="ml-4 px-12 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
