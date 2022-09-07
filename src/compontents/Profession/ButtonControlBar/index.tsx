import React from 'react'
import { IButtonItem } from '../../../types/form';


interface IProps{
    title:string|React.ReactNode
    buttonContent:IButtonItem[]
}

export default function ButtonControlBar(props:IProps) {
  return (
    <section className='w-full flex flex-col md:flex-row justify-center p-4 md:justify-between'>
        <p className='text-black'>
            {props.title}
        </p>
        <div>
        {props.buttonContent.map((item:IButtonItem,index:number)=>{
            return <button key={index} className={`rounded bg-${item.type} ${item.type=='default'?'text-black':'text-white'} mx-2 p-2`} onClick={()=>{item.method()}}>
                {item.context}
            </button>
        })}
        </div>
    </section>
  )
}
