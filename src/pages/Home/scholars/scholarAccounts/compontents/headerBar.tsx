import { Button } from 'antd'
import React from 'react'
import { history } from 'umi';
import ContentCard  from '@/compontents/Layout/ContentCard/index';
import { readCSVFile } from '@/utils/downloadFile';
interface IProps{
    modalClickItem:Function
}
export default function headerBar(props:IProps) {
    const createMass = () =>{
        props.modalClickItem(
            {},
            true,
            'Mass Create Scholar Accounts',
            <div>
                <ContentCard label='Upload a .csv to create multiple Scholar Accounts'>
                    <input type="file" onChange={(e:any)=>{
                       console.log(
                           readCSVFile(e.target.files)
                       );
                    }}/>
                </ContentCard>
            </div>
        )
    }
    const linkMass = () =>{
        props.modalClickItem(
            {},
            true,
            'Mass Link Schilar Accounts',
            <div>
                <ContentCard label='Upload a .csv to link or multiple Scholar Accounts'>
                    <input type="file" onChange={(e:any)=>{
                       console.log(
                           readCSVFile(e.target.files)
                       );
                    }}/>
                </ContentCard>
            </div>
        )
    }
  return (
    <div className='flex flex-wrap justify-content-between mb-3'>
        <h5>Create and view Scholar Accounts</h5>
        <div>
            <Button type='primary' size="large" className='rounded mr-2' onClick={()=>{
                history.push('/scholars/scholar-accounts/create-new-scholar-account')
            }}>Create Scholar Account</Button>
            <Button type="primary" size='large' className='rounded mx-1'
            onClick={createMass}
            >Mass Create</Button>
            <Button type='primary' size='large' className='rounded mx-1' onClick={linkMass}>Mass Link</Button>
        </div>
    </div>
  )
}
