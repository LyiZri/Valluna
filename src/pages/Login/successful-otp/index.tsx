import React, { useEffect } from 'react'
import SuccessPage from '@/compontents/Profession/SuccessfulPage'
import { history } from '@umijs/max';
export default function SuccessfulOTP() {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login/login-page");
    }, 3000);
  });
  return (
<div className="h-full w-full flex flex-col justify-center">
      <div className='w-full text-center'>
        <SuccessPage text='Welcome to Valluna,you are being redirected'/>
      </div>
</div>
  )
}
