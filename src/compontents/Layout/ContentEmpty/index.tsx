import { ConfigProvider, Empty } from 'antd'
import React from 'react'
import emptyPng from '@/assets/image/empty.png'
export default function index(props:any) {
    const renderEmpty = () => (
       <div className='bg-black flex justify-center text-center after:p-16'>
        <img className='block' src={emptyPng} alt="" />
       </div>
    )
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
        {props.children}
    </ConfigProvider>  
  )
}
