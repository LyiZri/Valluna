import LoginCard from '@/compontents/Layout/LoginCard';
import VaildPropmt from '@/compontents/Profession/Vaild-Promt';
import {
  ARegisterOTP,
  AResetPasswordGetOPT,
  AResetPasswordVerifyOPT,
} from '@/services/login';
import { Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { history, useSearchParams } from 'umi';
import { emailOTPVaild, OTPValid } from '../../../utils/vaildation';
import  ContentForm from '@/compontents/Layout/ContentForm';
import { IFormItem } from '@/types/form';

const EmailOtp = () => {
  const [emailBind, setEmailBind] = useState(0);
  const [emailCode, setEmailCode] = useState('');
  const [params] = useSearchParams();
  const [loading, setLoading] = useState({
    submitLoad: false,
    resendLoad: false,
  });
  const submitCode = async (e:any) => {
      if (params.getAll('type')[0] == 'reset') {
        setLoading({
          ...loading,
          submitLoad: true,
        });
        try {
          const data = await AResetPasswordVerifyOPT({
            email: params.getAll('email')[0],
            ...e
          });

          setLoading({
            ...loading,
            submitLoad: false,
          });
          if (data.code == 1) {
            history.push(
              `/login/reset-password?email=${
                params.getAll('email')[0]
              }&opt=${e.opt}`,
            );
          }
        } catch (error:any) {
            setLoading({
                ...loading,
                submitLoad:false
            })
            message.error(error?error:'pleas try again')
        }
      } else {
        setLoading({
          ...loading,
          submitLoad: true,
        });
        try {
        const data = await ARegisterOTP({
          email: params.getAll('email')[0],
          ...e
        });
        setLoading({
          ...loading,
          submitLoad:false
        })
        if (data.code == 1) {
          history.push('/login/successful-otp');
        }
    } catch (error:any) {
        setLoading({
            ...loading,
            submitLoad: false,
          });
          message.error(error?error:'please try again')   
    }
      }
  };
  const resendOtp = async () => {
    setLoading({
      ...loading,
      resendLoad: true,
    });
    const data = await AResetPasswordGetOPT({
      email: params.getAll('email')[0],
    });
    if (data.code == 1) {
      message.success('resend TOP Success!');
    }
    setLoading({
      ...loading,
      resendLoad: false,
    });
  };
  const formItem:IFormItem[] = [
    {
      name:'opt',
      require:true,
      validator:OTPValid,
      placeholder:"Email OTP Code",
      value:"",
      type:"input",
      className:"mt-5 bg-input-content text-white w-96 rounded",
    }
  ]
  useEffect(() => {}, []);
  const lableValue = () => {
    if (emailBind == 2) {
      return 'Verify your email to continue?';
    } else if (params.getAll('type')[0] == 'reset') {
      return 'Input Email Verrification Code to reset your password';
    } else {
      return 'Check your email';
    }
  };
  return (
    <LoginCard>
      <div className="text-white text-center">
        <h2 className="text-xl text-white">{lableValue()}</h2>
        <div className="text-white mt-12 mx-12 text-lg text-left">
          <p>Please enter the email you registered </p>
          <p>
            email:{' '}
            <span className="text-purple-500">{params.getAll('email')[0]}</span>
          </p>
          <ContentForm
          formItem={formItem}
          onFinish={submitCode}
          >
          <div className="flex justify-between mt-12">
            <Button
              loading={loading.submitLoad}
              className="rounded-sm bg-primary-button px-4 text-white"
              htmlType='submit'
              >
              Submit OTP
            </Button>
            <Button
              loading={loading.resendLoad}
              className="rounded-sm bg-gray-button px-4 text-white"
              onClick={resendOtp}
              >
              Resend OTP
            </Button>
          </div>
              </ContentForm>
        </div>
      </div>
    </LoginCard>
  );
};
export default EmailOtp;
