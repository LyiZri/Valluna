import ContentCard from '@/compontents/Layout/ContentCard/index';
import ContentForm from '@/compontents/Layout/ContentForm';
import IconFont from '@/compontents/Layout/IconFont';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import UploadModal from '@/compontents/Profession/UploadModal/index';
import UserGroups from '@/compontents/User/UserGroupsTag';
import { groupMassUpload, groupsUpdate } from '@/services/groups';
import { getUserMembersInfo } from '@/services/members';
import { createUserTag } from '@/services/scholars';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { useModel, useSearchParams } from '@umijs/max';
import { Button, Form, message, PageHeader, Popover, Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import AddUsers from './AddUsers';

interface DataType extends IUserInfo {}

export default function CreateUserTag() {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [uploadModalStatus, setUploadModalStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    save: false,
  });
  const [form] = Form.useForm();
  const [addArr, setAddArr] = useState<IUserInfo[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [selectRowKey, setSelectRowKey] = useState<React.Key[]>();
  let [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  let pageNum = 1;
  let searchData = {
    uid: '',
    gname: '',
    email: '',
    groups: [],
  };
  const [isUpdated, setIsUpdated] = useState(false);
  let memberGroup: string[] = [];
  const { groupInfo, setGroupInfo } = useModel('groupsInfo');
  const [params] = useSearchParams();
  useEffect(() => {
    if (params.getAll('gid')[0]) {
      setIsUpdated(true);
      if (groupInfo.members && groupInfo.members !== '') {
        memberGroup = groupInfo.members.split(',');
        getAddList();
      }
      setSelectRowKey(memberGroup);
    }
    return(
      setAddArr([])
    )
  }, []);
  const getAddList = async () => {
    const data = await getUserMembersInfo({ ids: memberGroup });
    setAddArr(data.data);
  };
  const search = async (values: any) => {
    searchData = values;
  };
  const onSelectChange = (e: React.Key[]) => {
    setSelectRowKey(e);
  };
  const rowSelection = {
    selectRowKey,
    onChange: onSelectChange,
  };
  const formItem: IFormItem[] = [
    {
      name: 'type',
      label: (
        <p>
          Account Type
          <Popover
            color="#000"
            content={
              <p className="text-white bg-black">
                Choose which accounts can be uploaded to user tag
              </p>
            }
          >
            <IconFont type="icon-gantanhao" className="text-xl ml-5"></IconFont>
          </Popover>
        </p>
      ),
      require: true,
      value: 2,
      type: 'radio',
      selectOption: [
        { value: 1, text: 'Member Account' },
        { value: 2, text: 'Scholar Account' },
      ],
    },
    {
      name: 'gname',
      label: 'User Group Name',
      type: 'input',
      value: isUpdated ? groupInfo.gname : '',
      require: true,
      placeholder: '',
    },
    {
      name: 'uploadUser',
      label: (
        <p>
          Account Type
          <Popover
            color="#000"
            content={
              <p className="text-white bg-black">
                Allow operator to upload accounts to the user tag
              </p>
            }
          >
            <IconFont type="icon-gantanhao" className="text-xl ml-5"></IconFont>
          </Popover>
        </p>
      ),
      type: 'buttonBar',
      value: '',
      require: false,
      render: (
        <Space>
          <Button
            className="ml-4  border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
            onClick={() => {
              setAddUserModalVisible(true);
            }}
          >
            Add Users
          </Button>
          <Button
            className="ml-4  border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
            onClick={() => {
              setUploadModalStatus(true);
            }}
          >
            Mass Upload
          </Button>
        </Space>
      ),
    },
    {
      name: 'currentUsers',
      label: 'Current Users',
      type: 'text',
      value: '',
      require: false,
      render: <p>{isUpdated ? groupInfo.num : addArr.length}</p>,
    },
  ];
  const searchItem: IFormItem[] = [
    {
      name: 'gid',
      type: 'input',
      placeholder: 'User ID',
      label: '',
      value: '',
      col: 3,
      require: false,
    },
    {
      name: 'scholarAccountName',
      type: 'input',
      placeholder: 'User Name',
      label: '',
      value: '',
      col: 3,
      require: false,
    },
    {
      name: 'email',
      type: 'input',
      placeholder: 'Email',
      label: '',
      value: '',
      col: 3,
      require: false,
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
          <Button className="ml-4  border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white">
            Remove Selected
          </Button>
        </>
      ),
    },
  ];
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
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
      render: (_, { game }) => {
        return <Tag>{game ? game : '-'}</Tag>;
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
      title: 'Discord ID',
      dataIndex: 'discordid',
      key: 'discordid',
      render: (_, { discordid }) => {
        return discordid ? <p>{discordid}</p> : <>-</>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, { gid }) => {
        return (
          <Space>
            <IconFont
              onClick={() => deleteItem(gid as string)}
              type="icon-shanchu"
              className="text-2xl cursor-pointer"
            ></IconFont>
          </Space>
        );
      },
    },
  ];

  const deleteItem = (gid: string) => {
    let arr: IUserInfo[] = [];
    arr = arr.concat(addArr);
    arr.map((item, index) => {
      if (item.gid == gid) {
        arr.splice(index, 1);
      }
    });
    setAddArr(arr);
  };
  const formSave = async (e: any) => {
    console.log(e);
    
    let members: string[] = [];
    addArr.map((item, index) => {
      members.push(item.uid as string);
    });
    if (params.getAll('gid'[0])) {
      const data = await groupsUpdate({
        ...e,
        members: members,
        gid:params.getAll('gid')[0]
      });
      if (data.code == 1) {
        message.success('Update Success');
      }
    } else {
      const data = await createUserTag({
        ...e,
        members: members,
      });
      if (data.code == 1) {
        message.success('Create Success');
      }
    }
  };
  const onCancel = () => {
    form.resetFields();
    setAddArr([]);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        title="Create New User Tag"
        subTitle=""
      />
      <ContentCard label="">
        {((isUpdated && params.getAll('gid')[0] == groupInfo.gid) ||
          (params.getAll('gid')[0] == undefined && !groupInfo.gid)) && (
          <ContentForm
            initialValues={groupInfo}
            form={form}
            formItem={formItem}
            onFinish={formSave}
          ></ContentForm>
        )}
        {(!isUpdated || groupInfo.num == 0 ||(addArr.length!=0)) && <>
        <SearchBar search={search} searchItem={searchItem} />
        <Table
          rowClassName={'bg-bar-bg text-white bg-card-bg'}
          rowSelection={rowSelection}
          className="mt-4"
          rowKey={'uid'}
          columns={tableColums}
          dataSource={addArr}
          pagination={{
            pageSize: 10,
            itemRender: itemRender,
            total: pageData.amount,
            onChange: (e) => {
              pageNum = e;
              getAddList();
            },
          }}
          ></Table>
          </>
          }
        <div>
          <Button
            onClick={onCancel}
            className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
          >
            cancel
          </Button>
          <Button
            loading={loadingStatus.save}
            onClick={() => form.submit()}
            className="ml-4  border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
          >
            Save
          </Button>
        </div>
      </ContentCard>
      <AddUsers
        addArr={addArr}
        setAddArr={setAddArr}
        visible={addUserModalVisible}
        setVisible={setAddUserModalVisible}
      />
      <UploadModal
        setUploadModalStatus={setUploadModalStatus}
        uploadModalStatus={uploadModalStatus}
        title="Mass Upload Accounts"
        label="Upload a .csv to Upload Accounts"
        uploadFunction={groupMassUpload}
        templateValue={[
          ['User Group ID*,User ID,Scholar ID'],
          ['1', '3', ''],
          ['2', '', '4'],
        ]}
      />
    </div>
  );
}
