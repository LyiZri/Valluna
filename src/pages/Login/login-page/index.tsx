import React, { useEffect, useState } from "react";
import { history } from "umi";
import Logo from '@/assets/image/vallunaLogo.png'
import { Button, Divider, Input, Layout } from "antd";
import IconFont  from '@/compontents/Layout/IconFont';
import { Alogin } from "@/services/login";
import { useModel } from "@umijs/max";
export default function LoginPage() {
    const [userValue,setUserValue] = useState({
        account:'',
        password:''
    })
    // const {  setAccountsInfoData } = useModel('accountsInfo')
    const [loading,setLoading] = useState(false)
    const login = async ()=>{
      setLoading(true)
      const data = await Alogin(userValue)
      setLoading(false)
      if(data.code == 1){
        localStorage.setItem('valluna.user-info',JSON.stringify(data.data))
        localStorage.setItem('token',data.data.token)
        history.push('/accounts/valluna-accounts')
      }
    }
  return (
    <div className="h-[100vh] px-36 bg-page-bg  flex flex-col justify-center ">
      <div className="flex justify-between">
        <div className="col-md-6 flex flex-row  h-3/4 justify-center">
          <img src={Logo} alt="" className=""/>
        </div>
        <div className="col-md-6">
          <div className="rounded-xl bg-card-bg p-6">
              <p className="text-white text-xl font-semibold mb-6 w-full text-center">Welcome to Valluna Guild Portal!</p>
            <Input className="mb-4 bg-input-content text-white rounded-none" placeholder="Email" onChange={(e:any)=>{setUserValue({
                ...userValue,
                account:e.target.value
            })}}/>
            <Input.Password onPressEnter={login} iconRender={(visible:boolean)=>{
              return visible?<IconFont type="icon-yanjing_xianshi"></IconFont>:<IconFont type="icon-yanjing_yincang"></IconFont>
            }} className="text-white bg-input-content rounded-none" placeholder="Password" onChange={(e:any)=>{setUserValue({
                ...userValue,
                password:e.target.value
            })}}/>
            <p className="cursor-pointer mt-2 mb-4 text-purple-500" onClick={()=>{history.push('/login/reset-password-lp')}}>Forgot your password</p>
            <Button className="w-full bg-primary-button text-white border-none" loading={loading} onClick={login}>
              Log in
            </Button>
            <Divider className="">Or</Divider>
           <Button className="w-full bg-white">Google</Button>
            <p className="mt-5 text-center text-white">New to Valluna? <span role={"button"} onClick={()=>{history.push('/login/create-account')}} className="text-purple-500">Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
