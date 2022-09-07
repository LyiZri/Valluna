import React from 'react'
import { useEffect } from 'react';
import { history, Outlet } from 'umi';

export default function axieInfinity() {
    useEffect(()=>{
        history.push('/axie-infinity/performance')
    },[])
  return (
    <div>
        <Outlet/>
    </div>
  )
}
