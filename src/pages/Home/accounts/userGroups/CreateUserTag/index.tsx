import ContentCard from '@/compontents/Layout/ContentCard/index';
import ContentForm from '@/compontents/Layout/ContentForm';
import SearchBar from '@/compontents/Layout/SearchBar';
import {  IFormItem }from '@/types/form';
import { DeleteOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Form, PageHeader, Space, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import AddUsers from './AddUsers';
import {IUserInfo} from '@/types/user'
import UploadModal from '@/compontents/Profession/UploadModal/index';

export default function CreateUserTag() {

  const [addUserModalVisible,setAddUserModalVisible] = useState(false)
  const [uploadModalStatus,setUploadModalStatus] = useState(false)
  const [form] = Form.useForm()
  const formItem: IFormItem[] = [
    {
      name: 'accountType',
      label: 'Account Type',
      require: true,
      value: 2,
      type: 'radio',
      selectOption: [
        { value: 1, text: 'Member Account' },
        { value: 2, text: 'Scholar Account' },
      ],
    },
    {
      name: 'userTagName',
      label: 'User Tag Name',
      type: 'input',
      value: '',
      require: true,
      placeholder: '',
    },
    {
      name: 'uploadUser',
      label: 'Upload Users',
      type: 'buttonBar',
      value: '',
      require: false,
      render: (
        <Space>
          <Button className=" bg-primary text-white " type='primary' onClick={()=>{
            setAddUserModalVisible(true)
          }}>
            Add Users
          </Button>
          <Button className=" bg-primary " type='primary' onClick={()=>{setUploadModalStatus(true)}}>
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
      render: <p>{}</p>,
    },
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
      name:'wallet',
      type:'input',
      placeholder:'Wallet',
      label:'',
      value:'',
      require:false
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
      selectOption: [{value:1,text:'12312313'},{value:2,text:'12312312'}],
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
          <Button icon={<SearchOutlined/>} htmlType="submit"></Button>
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
        <Button className='bg-primary' type='primary'>Add</Button>
        </>
      ),
    },
  ];
  const tableColums: ColumnsType<IUserInfo> = [
    {
      title: 'Scholar User ID',
      dataIndex: 'scholarUserId',
      key: 'scholarUserId',
    },
    {
      title: 'Scholar Name',
      dataIndex: 'scholarName',
      key: 'scholarName',
    },
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
      render:(_,{game})=>{
        return(
          <Tag>{game?game:'undefined'}</Tag>
        )
      }
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render:(_,{tags})=>{
        return(

          tags?.map((item,index)=>{
            return(
              <Tag key={index}>{item.text}</Tag>
              )
            })
            )
      }
    },
    {
      title: 'Member User ID',
      dataIndex: 'memberUserId',
      key: 'memberUserId',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <DeleteOutlined className="cursor-pointer" />
          </Space>
        );
      },
    },
  ];
  const [tableData,setTableData] =useState<IUserInfo[]>([
    // {
    //   scholarUserId:'1',
    //   scholarName:'2',
    //   wallet:'3',
    //   email:'4',
    //   game:5,
    //   tags:[{value:1,text:'Tags'}],
    //   memberUserId:'7'
    // },
    // {
    //   scholarUserId:'2',
    //   scholarName:'2',
    //   wallet:'3',
    //   email:'4',
    //   game:5,
    //   tags:[{value:1,text:'Tags'}],
    //   memberUserId:'7'
    // },
    // {
    //   scholarUserId:'3',
    //   scholarName:'2',
    //   wallet:'3',
    //   email:'4',
    //   game:5,
    //   tags:[{value:1,text:'Tags'}],
    //   memberUserId:'7'
    // }
  ])
  const formSave = (e:any)=>{
    console.log(e);
  }
  const save = ()=>{
    form.submit()
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        title="Create New User Tag"
        subTitle=""
      />
      <ContentCard label="">
        <ContentForm form={form} formItem={formItem} onFinish={formSave}></ContentForm>
        <SearchBar search={()=>{}} searchItem={searchBarItem} />
        <Table className='mt-4' rowKey={'scholarUserId'} columns={tableColums} dataSource={tableData}></Table>
        <div>
          <Button>cancel</Button>
          <Button type='primary' className='bg-primary mx-4' onClick={save} htmlType="submit">Save</Button>
        </div>
      </ContentCard>
      <AddUsers tableData={tableData} setTableData={setTableData} visible={addUserModalVisible} setVisible={setAddUserModalVisible}/>
      <UploadModal setUploadModalStatus={setUploadModalStatus} uploadModalStatus={uploadModalStatus} title="Mass Upload Accounts" label='Upload a .csv to Upload Accounts'/>
    </div>
  );
}
