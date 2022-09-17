import { useState } from 'react';

import CountryValue from '@/assets/json/language.json';
import Form from '@/compontents/Layout/Form';
import LoginCard from '@/compontents/Layout/LoginCard';
import { ARegister } from '@/services/login';
import { Button, message, Select } from 'antd';
import { history } from 'umi';
import {
  emialVaild,
  passwordVaild,
  reEnterPasswordVaild,
  usernameVaild,
} from '../../../utils/vaildation';
import ContentForm from '@/compontents/Layout/ContentForm';
import { IFormItem } from '@/types/form';
import { useForm } from 'antd/es/form/Form';
interface formItemType {
  value: string;
  validBind: number;
  placeholderText: string;
  inputType: string;
  valueName: string;
}

export default function CreateAccount() {
  //form vaildation rules
  //default:0,right:1,wrong:2
  const [form] = useForm()
  const [vaildState, setVaildState] = useState({
    userNameVaild: 0,
    emailVaild: 0,
    passwordVaild: 0,
    repassword: 0,
  });
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    country: 1,
  });
  const [loading, setLoading] = useState(false);
  //Perform from vaildation
  const submitNext = async (e:any) => {
    setLoading(true);
    try {;
      const data = await ARegister(e);
      setLoading(false);
      if (data.code == 1) {
        history.push(`/login/email-otp?email=${e.email}`);
        setFormValue({
          username: '',
          email: '',
          password: '',
          repassword: '',
          country: 1,
        });
        }
      } catch (error:any) {
        setLoading(false);
        message.error(error?error:'pleas try again')
      }
  };
  const item: IFormItem[] = [
    {
      name: 'username',
      label: '',
      value: formValue.username,
      require: true,
      requireMsg:"",
      type: 'input',
      placeholder:'Username',
      className:"w-96"
    },
    {
      name: 'email',
      label: '',
      require:true,
      validator: emialVaild,
      type: 'input',
      placeholder:"Email",
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
    {
      name:'country',
      label:'',
      value:formValue.country,
      require:true,
      requireMsg:"",
      type:"country",
      className:"!w-96"
    }
  ];
  return (
    <LoginCard>
      <div className="text-white text-center w-96">
        <h2 className="text-xl text-white mb-12">Create an Account </h2>
        <ContentForm
        form={form}
          formItem={item}
          onFinish={submitNext}
        >
          <div className="mb-3">
            <Button
              style={{ width: '100%' }}
              type="primary"
              loading={loading}
              htmlType="submit"
              className="mt-16 w-full bg-primary-button text-white border-none"
            >
              Next
            </Button>
          </div>
        </ContentForm>
      </div>
    </LoginCard>
  );
}
