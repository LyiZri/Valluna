import ContentCard from '@/compontents/Layout/ContentCard/index';
import ContentForm from '@/compontents/Layout/ContentForm/index';
import { memberUpdata } from '@/services/members';
import { IFormItem } from '@/types/form';
import {
  ILanguage,
  IUserInfo,
  permissionsData,
  userGroupsData,
} from '@/types/user';
import { useModel, useSearchParams } from '@umijs/max';
import { Button, message, PageHeader, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import LanguageAdd from './compontents/languageAdd';
import { Modal } from 'antd';
import PasswordUpdate from './compontents/passwordUpdate';
import  IconFont  from '@/compontents/Layout/IconFont';
import { countryValid, emialVaild, usernameVaild } from '@/utils/vaildation';
import { getCountryName } from '../../../../utils/format';
import { useEffect } from 'react';
import { getUserInfo } from '@/utils/user';

export default function accountDetails() {
  const {
    accountsInfoData,
    setAccountsInfoData,
    accountsInfoLanguageData,
    setAccountsInfoLanguageData,
  } = useModel('accountsInfo');
  const [form] = useForm();
  const [modalStatus,setModalStatus] = useState(false)
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (params.getAll('uid')[0]) {
      return true;
    } else {
      return false;
    }
  });
  const [formValue, setFormValue] = useState<IUserInfo>({});
  const reset = () => {
    form.resetFields();
    setAccountsInfoData({
      ...accountsInfoData,
      language: [],
    });
  };
  const addLanguage = () => {
    let languageArr: ILanguage[] = accountsInfoLanguageData == null ? [] : accountsInfoLanguageData;
    languageArr.push({
      language: '',
      proficiency: 0,
    });
    setAccountsInfoData({
      ...accountsInfoData,
      language: languageArr,
    });
  };
  const onSave = async (e: IUserInfo) => {
    console.log(accountsInfoLanguageData,e);
    const saveData: IUserInfo = {
      ...accountsInfoData,
      ...e,
      language: JSON.stringify(accountsInfoLanguageData),
    };
    setLoading(true);
    try {
      const data = await memberUpdata(saveData);
      setLoading(false);
      if (data.code == 1) {
        message.success('success');
        localStorage.setItem('valluna.user-info', JSON.stringify(data.data));
      }
    } catch (error: any) {
      message.error(error);
      setLoading(false);
    }
  };
  const item: IFormItem[] = [
    {
      name: 'uid',
      label: 'User ID',
      value: formValue.uid,
      require: false,
      type: 'input',
      disabled: true,
    },
    {
      name: 'username',
      label: 'Username',
      value: formValue.username,
      require: !isDisabled,
      validator:usernameVaild,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'email',
      label: 'Email',
      value: formValue.email,
      require: !isDisabled,
      validator:emialVaild,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'firstname',
      label: 'First Name',
      value: formValue.firstname,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'lastname',
      label: 'Last Name',
      value: formValue.lastname,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'country',
      label: 'Country',
      value: formValue.country,
      require: !isDisabled,
      validator:countryValid,
      type: 'country',
      disabled: isDisabled,
    },
    {
      name: 'discordid',
      label: 'Discord ID',
      value: formValue.discordid,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'raddress',
      label: 'Ronin Wallet Address',
      value: formValue.raddress,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
    {
      name: 'language',
      label: 'Language',
      value: '',
      require: false,
      type: 'button',
      render: (
        <div>
          <LanguageAdd isDisabled={isDisabled}/>
          <Button
          className={`ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white ${isDisabled?'hidden':''}`}
            onClick={addLanguage}
          >
            +Add
          </Button>
        </div>
      ),
    },
  ];
  const permimssionsItem: IFormItem[] = [
    {
      name: 'roles',
      label: 'Roles',
      value: formValue.groups,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
  ];
  const tagsItem: IFormItem[] = [
    {
      name: 'tags',
      label: 'Tags',
      value: formValue.game,
      require: false,
      type: 'input',
      disabled: isDisabled,
    },
  ];

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        backIcon={<IconFont type='icon-a-houtuifanhui' className='text-5xl text-purple-500'></IconFont>}
        subTitle={<p className='text-2xl text-white'>lndividual Account User lD : {isDisabled?accountsInfoData.uid:getUserInfo().uid}
          </p>}
      />
      <ContentCard label="Basic Infomation">
        { 
          ((params.getAll("uid")[0] == accountsInfoData.uid) || (!isDisabled)) &&
        <ContentForm
        initialValues={
          isDisabled?{
          ...accountsInfoData,country:getCountryName(accountsInfoData.country as string)
        }:{
          ...getUserInfo(),
          country:getCountryName(accountsInfoData.country as string)
        }}
        onFinish={onSave}
        formItem={item}
        form={form}
        >
          {!isDisabled && (
            <div>
              <Button
                onClick={reset}
                className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
                >
                Cancel
              </Button>
              <Button
                loading={loading}
                htmlType="submit"
                className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
                >
                Save
              </Button>
            </div>
          )}
        </ContentForm>
        }
      </ContentCard>
      {
        !isDisabled && (
          <ContentCard label="Password and Authentication ">
            <Button onClick={()=>{setModalStatus(true)}} className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white">
            Change Password 
            </Button>
          </ContentCard>
        )
      }
      <ContentCard label="Permisssions">
        <>
          {accountsInfoData.permissons == null && (
            <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">-</Tag>
          )}
          {accountsInfoData.permissons !== null &&
            accountsInfoData.permissons?.map((per, index) => {
              permissionsData.map((item, index) => {
                if (per == item.value) {
                  return (
                    <Tag
                      className="bg-gray-button text-white px-4 py-2 border-none rounded"
                      key={item.value}
                    >
                      {item.label}
                    </Tag>
                  );
                }
              });
            })}
        </>
      </ContentCard>
      <ContentCard label="Tags">
        {userGroupsData.map((item, index) => {
          if (item.value == accountsInfoData.groups) {
            return (
              <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded" key={item.value}>
                {item.label}
              </Tag>
            );
          }
        })}
      </ContentCard>
      <Modal onCancel={()=>{setModalStatus(!modalStatus)}} width={432} closeIcon={<IconFont type='icon-close' className='text-xl'></IconFont>} visible={modalStatus} className="bg-card-bg" footer={null}>
        <PasswordUpdate modalStatus={modalStatus} setModalStatus={setModalStatus}></PasswordUpdate>
      </Modal>
    </div>
  );
}
