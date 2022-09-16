import ContentCard from '@/compontents/Layout/ContentCard/index';
import IconFont from '@/compontents/Layout/IconFont';
import { readCSVFile } from '@/utils/downloadFile';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import { useEffect } from 'react';
interface IProps {
  modalClickItem: Function;
}
export default function headerBar(props: IProps) {
  const {scholarInfo,setScholarInfo} = useModel("scholarInfo")
  let inputRef: any;
  const upload = () => {
    inputRef.click();
  };
  const getFile = async (e: any) => {
    const data = await readCSVFile(e);
    console.log(12333, e.name);
    if (data) {
      setFileValue(e);
    }
  };
  const [fileValue, setFileValue] = useState<File>();
  const createMass = () => {
    props.modalClickItem(
      {},
      true,
      'masscreate',
      'file',
      <div className="text-center">
        <p className="text-white text-2xl mb-6">Mass Create Scholar Accounts</p>
        <p className='text-white text-lg mb-6'>Remove multiple accounts from different User Groups in the same</p>
      </div>,
    );
  };
  const linkMass = () => {
    props.modalClickItem(
      {},
      true,
      'masslink',
      'file',
      <div className="text-center">
        <p className="text-white text-2xl mb-6">Mass Upload Accounts </p>
        <p className='text-white text-xl mb-6'>Upload a .csv to upload Multiple Accounts </p>
      </div>,
    );
  };
  return (
    <div className="flex flex-wrap justify-between mb-3 pt-10">
      <div>
      <h1 className='text-white text-2xl mb-2 font-semibold'>Scholar Account Overview</h1>
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
            setScholarInfo({gameid:1})
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
