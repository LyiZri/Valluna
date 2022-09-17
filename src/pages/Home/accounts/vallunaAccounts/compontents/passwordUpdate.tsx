import { changePassword } from '@/services/members';
import { IFormItem } from '@/types/form';
import { passwordVaild } from '@/utils/vaildation';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import  ContentForm  from '@/compontents/Layout/ContentForm';
import { useForm } from 'antd/es/form/Form';
interface IProps {
  modalStatus: boolean;
  setModalStatus: Function;
}

export default function PasswordUpdate({
  modalStatus,
  setModalStatus,
}: IProps) {
  const [form] = useForm()
  const [loading, setLoading] = useState(false);
  const cancel = () => {
    form.resetFields()
    setModalStatus(!modalStatus);
  };

  const submit = async (e:any) => {
    setLoading(true);
    const data = await changePassword({
      ...e
    });
    setLoading(false);
    if (data.code == 1) {
      message.success('Success');
      setModalStatus(!modalStatus);
    }
  };
  const formItem: IFormItem[] = [
    {
      name: 'oldpassword',
      label: '',
      require: true,
      validator: passwordVaild,
      type: 'password',
      placeholder:'Current Password',
      className:"w-96"
    },
    {
      name: 'password',
      label: '',
      require: true,
      validator: passwordVaild,
      type: 'password',
      placeholder:"New Password",
      className:"w-96"
    },
    {
      name: 'repassword',
      label: '',
      requireMsg: 'Passwords do not match',
      require: true,
      type: 'repassword',
      placeholder: 'Re-enter Password',
      className: 'w-96',
    },
  ];
  return (
    <div className="text-center text-white">
      <h2 className="mb-4 text-2xl text-white">Update your password </h2>
      <h3 className="mb-4 text-white">
        Enter your current password and a new password{' '}
      </h3>
      <ContentForm formItem={formItem} form={form} onFinish={submit}>
      <div className="w-full flex justify-between">
        <Button
          onClick={cancel}
          className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
        htmlType='submit'
        >
          Done
        </Button>
      </div>
      </ContentForm>
    </div>
  );
}
