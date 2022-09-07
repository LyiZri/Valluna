
import { history } from "@umijs/max";
import { Outlet } from "@umijs/max";
import { useEffect } from 'react';
export default function Login() {
  useEffect(()=>{
    history.push('/login/login-page')
  },[])
  return (
    <div className="h-[100vh] bg-page-bg">
    <Outlet/>
    </div>
  );
}
