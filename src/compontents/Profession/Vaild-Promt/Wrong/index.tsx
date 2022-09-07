import { CloseOutlined } from '@ant-design/icons'
import React from 'react'


interface Props {
    text:string
}
export default function Wrong({text}:Props) {
  return (
    <div className='wrong mb-2 text-sm'>
        <CloseOutlined style={{color:"red"}}/>
        <span style={{color:"red"}} className="ml-4 ">{text}</span>
    </div>
  )
}
