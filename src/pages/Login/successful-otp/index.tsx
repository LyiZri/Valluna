import React, { useEffect } from 'react'
import SuccessPage from '@/compontents/Profession/SuccessfulPage'
import LoginCard from '@/compontents/Layout/LoginCard'
import { history } from '@umijs/max';
export default function SuccessfulOTP() {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login/login-page");
    }, 3000);
  });
  return (
    <LoginCard>
        <SuccessPage text='Welcome to Valluna,you are being redirected'/>
    </LoginCard>
  )
}
