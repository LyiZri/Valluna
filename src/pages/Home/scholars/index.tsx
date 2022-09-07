import React from 'react'
import { useEffect } from 'react';
import { history, Outlet } from 'umi';

export default function index() {
    useEffect(()=>{
        history.push('/scholars/scholar-accounts')
    },[])
  return (
    <div>
        <Outlet/>
    </div>
  )
}