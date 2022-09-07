import IconFont from '@/compontents/Layout/IconFont';
import LoginCard from '@/compontents/Layout/LoginCard';
import { resetPassword } from '@/services/login';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { history, useSearchParams } from 'umi';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState({
    password: '',
    rePassword: '',
  });
  const email = params.getAll('email')[0];
  const opt = params.getAll('opt')[0];

  const [warnState, setWarnState] = useState('');
  const submit = async () => {
    if (passwordValue.password !== passwordValue.rePassword) {
      setWarnState('The two passwords are different');
      return;
    }
    if (passwordValue.password == '') {
      setWarnState('The password is invalid');
      return;
    }
    setLoading(true);
    const data = await resetPassword({
      email,
      opt,
      password: passwordValue.password,
    });
    if (data == 1) {
      setLoading(false);
      history.push('/login/successful-prompt');
    }
    setLoading(false);
  };
  return (
    <LoginCard>
      <div className="text-white text-center">
        <h2 className="text-xl text-white mb-8">Reset Password </h2>
        <p className="mb-4">
          Your new password must be different from previous passwords
        </p>
        <Input.Password
          iconRender={(visible: boolean) => {
            return visible ? (
              <IconFont type="icon-yanjing_xianshi"></IconFont>
            ) : (
              <IconFont type="icon-yanjing_yincang"></IconFont>
            );
          }}
          placeholder="Enter New password"
          onChange={(e)=>{
            setPasswordValue({
              ...passwordValue,
              password:e.target.value
            })
            setWarnState('')
          }}
          className="border-none mb-4 bg-input-content text-white"
        />
        <Input.Password
          iconRender={(visible: boolean) => {
            return visible ? (
              <IconFont type="icon-yanjing_xianshi"></IconFont>
            ) : (
              <IconFont type="icon-yanjing_yincang"></IconFont>
            );
          }}
          onChange={(e)=>{
            setPasswordValue({
              ...passwordValue,
              rePassword:e.target.value
            })
            setWarnState('')
          }}
          placeholder="Confirm New password"
          className="border-none mb-4 bg-input-content text-white"
        />
        {warnState != '' ? <p className="my-4 text-red-500">{warnState}</p> : <p className='my-4'></p>}
        <Button
          loading={loading}
          className="w-1/3 rounded mt-4 bg-primary-button text-white border-none"
          onClick={submit}
        >
          Next
        </Button>
      </div>
    </LoginCard>
  );
}
