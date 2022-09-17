import ContentCard from '@/compontents/Layout/ContentCard';
import ContentForm from '@/compontents/Layout/ContentForm/index';
import IconFont from '@/compontents/Layout/IconFont';
import { createScholar, getScholarInfo } from '@/services/scholars';
import { IFormItem } from '@/types/form';
import { gameData } from '@/types/user';
import { emialVaild, raddressVaild, passwordVaild } from '@/utils/vaildation';
import { useSearchParams, useModel } from '@umijs/max';
import { Button, message, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { IUserInfo } from '../../../../types/user';
export default function createNewScholarAccount() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const {scholarInfo,setScholarInfo} = useModel("scholarInfo")
  useEffect(() => {
    if (params.getAll('sid')[0]) {
      setIsUpdated(true);
      getScholarData();
    } else {
      setIsUpdated(false);
    }
  }, []);
  const getScholarData = async () => {
    const data = await getScholarInfo({ ids: [params.getAll('sid')[0]] });
    if (data.code == 1) {
      setScholarInfo(data.data[0]);
    }
  };
  const formItem: IFormItem[] = [
    {
      name: 'account_name',
      label: 'Scholar Name',
      require: false,
      value: scholarInfo.account_name,
      type: 'input',
      placeholder: 'Scholar Name',
    },
    {
      name: 'gameid',
      label: 'Game',
      value: scholarInfo.gameid,
      require: true,
      type: 'select',
      placeholder: 'Axie',
      selectOption: gameData,
    },
    {
      name: 'raddress',
      label: 'Wallet Address',
      require: true,
      value: scholarInfo.raddress,
      type: 'input',
      validator:raddressVaild,
      placeholder: 'Wallet Address',
    },
    {
      name: 'email',
      label: 'Email',
      require: true,
      value: scholarInfo.email,
      type: 'input',
      validator:emialVaild,
      placeholder: 'Email',
    },
    {
      name: 'password',
      label: 'Email Password',
      require: true,
      value: scholarInfo.password,
      type: 'password',
      validator:passwordVaild,
      placeholder: 'Email Password',
    },
    {
      name: 'memberid',
      label: 'Link to a Member Account',
      require: false,
      value: scholarInfo.memberid,
      type: 'input',
      placeholder: 'User ID',
    },
  ];
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = await createScholar(values);
      if (data.code == 1) {
        message.success('Success!');
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        backIcon={<IconFont type='icon-a-houtuifanhui' className='text-5xl text-purple-500'></IconFont>}
        subTitle={<p className='text-2xl text-white'>{isUpdated?`Scholar Account:${scholarInfo.sid}`:"Create New Scholar Account"}
          </p>}
      />
      <ContentCard label="">
        {(isUpdated && scholarInfo.sid) && (
          <ContentForm initialValues={scholarInfo} formItem={formItem} onFinish={onFinish}>
            <>
              <Button
                className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
                htmlType="reset"
              >
                Cancel
              </Button>
              <Button
                className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
                htmlType="submit"
              >
                Save
              </Button>
            </>
          </ContentForm>
        )}
        {!isUpdated&& (
          <ContentForm initialValues={{gameid:1}} formItem={formItem} onFinish={onFinish}>
            <>
              <Button
                className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
                htmlType="reset"
              >
                Cancel
              </Button>
              <Button
                className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
                htmlType="submit"
              >
                Save
              </Button>
            </>
          </ContentForm>
        )}
      </ContentCard>
    </div>
  );
}
