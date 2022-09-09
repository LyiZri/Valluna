import ContentCard from '@/compontents/Layout/ContentCard/index';
import { readCSVFile } from '@/utils/downloadFile';
import { Button } from 'antd';
import { history } from 'umi';
import { useRef } from 'react';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
interface IProps {
  modalClickItem: Function;
}
export default function headerBar(props: IProps) {
    let inputRef:any
    const upload = ()=>{
        inputRef.click()
    }
  const createMass = () => {
    props.modalClickItem(
      {},
      true,
      '',
      <div className="text-center">
        <p className="text-white text-2xl">Mass Create Scholar Accounts</p>
        <ContentCard  label="Upload a .csv to create multiple Scholar Accounts">
          <div className="text-2xl flex flex-columns justify-center text-purple-500 bg-black w-full h-32 cursor-pointer rounded-xl" onClick={upload}>
            Drop  <span className='text-white'>  or </span>  Select CSV file
            <input
                ref={(el)=>{
                    inputRef = el
                }}
              type="file"
              className="hidden"
              onChange={(e: any) => {
                console.log(inputRef.files[0]);
                console.log('result====',readCSVFile(inputRef.files[0]));
              }}
            />
          </div>
        </ContentCard>
      </div>,
    );
  };
  const linkMass = () => {
    props.modalClickItem(
      {},
      true,
      'Mass Link Schilar Accounts',
      <div>
        <ContentCard label="Upload a .csv to link or multiple Scholar Accounts">
          <input
            type="file"
            onChange={(e: any) => {
              console.log(readCSVFile(e.target.files));
            }}
          />
        </ContentCard>
      </div>,
    );
  };
  return (
    <div className="flex flex-wrap justify-between mb-3 pt-10">
      <div>
        <p className="text-2xl text-white mb-3">Scholar Account Overview</p>
        <p className="text-md text-gray-400">
          Manage Scholar accounts owned by the Guild <br />
          Create and view Scholar Accounts
        </p>
      </div>
      <div className="mt-8">
        <Button
          className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
          size="large"
          onClick={() => {
            history.push(
              '/scholars/scholar-accounts/create-new-scholar-account',
            );
          }}
        >
          Create Scholar Account
        </Button>
        <Button
          size="large"
          className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
          onClick={createMass}
        >
          Mass Create
        </Button>
        <Button
          size="large"
          className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
          onClick={linkMass}
        >
          Mass Link
        </Button>
      </div>
    </div>
  );
}
