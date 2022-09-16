import headerLogo from '@/assets/image/headerLogo.png';
import { getUserInfo } from '@/utils/user';
import { MenuOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Popover, Tooltip } from 'antd';
import { useState } from 'react';
export default function index(props: any) {
  const { accountsInfoData, setAccountsInfoData } = useModel(
    'accountsInfo',
    (model: any) => ({
      accountsInfoData: model.accountsInfoData,
      setAccountsInfoData: model.setAccountsInfoData,
    }),
  );
  const [popOpen, setPopOpen] = useState(false);
  const pushInfo = () => {
    setAccountsInfoData(getUserInfo());
    history.push('/accounts/valluna-accounts/account-details');
  };
  const signOut = () => {
    localStorage.clear()
    history.push("/login/login-page")
  };
  return (
    <div className="z-50 ">
      <div className="z-50 fixed bg-card-bg left-0 w-full h-[70px]  p-4 text-white  flex justify-between top-0">
        <div className="flex justify-start">
          <MenuOutlined className="cursor-pointer text-2xl mr-4" />
          <img src={headerLogo} width={303} height={45} alt="" />
        </div>
        <div>
          <Popover
            color='#8359da'
            overlayClassName="p-0 rounded-xl"
            overlayInnerStyle={{padding:0,borderRadius:"8px"}}
            content={
              <div className='w-28'>
                <div className='p-2 px-4 text-md  text-white text-center'>{accountsInfoData.username}</div>
                <div onClick={pushInfo} className='p-2 px-4 text-md text-center border-b border-gray-500 bg-black text-white cursor-pointer'>View Profile</div>
                <div onClick={signOut} className='rounded-b-lg p-2 px-4 text-md text-center bg-black text-white cursor-pointer'>Sign out</div>
              </div>
            }
            trigger="click"
            open={popOpen}
            onOpenChange={() => {
              setPopOpen(!popOpen);
            }}
          >
            <Avatar size={45} className="bg-btn-bg cursor-pointer">
              {accountsInfoData.username[0]}
            </Avatar>
          </Popover>
        </div>
      </div>
    </div>
  );
}
