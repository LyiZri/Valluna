import LoginCard from '@/compontents/Layout/LoginCard';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { history } from 'umi';

export default function ResetPasswordLP() {
  const [email, setEmail] = useState('');
  return (
    <LoginCard>
      
        <h2 className="mb-12 text-white text-2xl">Reset your password</h2>
        <div className="text-left">
          <p className="mb-4">Please enter this email you registered</p>
          <Input
            className="bg-input-content text-white w-96 rounded-md "
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
        </div>
        <Button
          className="mt-24 bg-primary-button text-white w-32"
          onClick={() => {
            history.push(`/login/email-otp?type=reset&email=${email}`);
          }}
        >
          Next
        </Button>
    </LoginCard>
  );
}
