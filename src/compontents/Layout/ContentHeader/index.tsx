import { MenuOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import { history } from "@umijs/max";
import headerLogo from '@/assets/image/headerLogo.png'
export default function index(props: any) {
  return (
    <div className="z-50 ">
      <div className="z-50 fixed bg-card-bg left-0 w-full h-[70px]  p-4 text-white  flex justify-between top-0">
        <div className="flex justify-start">
        <MenuOutlined className="cursor-pointer text-2xl mr-4"/>
      <img src={headerLogo} width={303} height={45} alt="" />
        </div>
        <div>
          <Avatar size={45} className="bg-btn-bg cursor-pointer" onClick={()=>{history.push('/accounts/valluna-accounts/account-details')}}>V</Avatar>
        </div>
      </div>
    </div>
  );
}
