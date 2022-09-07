import React from 'react'
interface IProps{
    label:string|React.ReactNode,
    children:React.ReactNode
}

export default function ContentCard(props:IProps) {
  return (
    <div className='mt-10  mr-10 text-white'>
        <h3 className='ml-5 text-gray-300 font-semibold'>{props.label}</h3>
        <div className='bg-bar-bg mt-5 rounded-2xl p-5 bg-card-bg '>
            {props.children}
        </div>
    </div>
  )
}
