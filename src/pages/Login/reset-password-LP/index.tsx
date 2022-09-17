import ContentForm from '@/compontents/Layout/ContentForm';
import LoginCard from '@/compontents/Layout/LoginCard';
import { IFormItem } from '@/types/form';
import { emialVaild } from '@/utils/vaildation';
import { Button } from 'antd';
import { useState } from 'react';
import { history } from 'umi';

export default function ResetPasswordLP() {
  const [email, setEmail] = useState('');
  const formItem: IFormItem[] = [
    {
      name: 'email',
      label: '',
      require: true,
      placeholder: 'Email',
      validator: emialVaild,
      type:"input",
      className:"w-96"
    },
  ];
  const next = (e: any) => {
    history.push(`/login/email-otp?type=reset&email=${e.email}`);
  };
  return (
    <LoginCard>
      <h2 className="mb-12 text-white text-2xl">Reset your password</h2>
      <div className="text-left">
        <p className="mb-4">Please enter this email you registered</p>
        <ContentForm formItem={formItem} onFinish={next}>
          <div className='text-center'>
          <Button
            className="mt-12 bg-primary-button text-white w-32"
            htmlType="submit"
            >
            Next
          </Button>
            </div>
        </ContentForm>
      </div>
    </LoginCard>
  );
}
