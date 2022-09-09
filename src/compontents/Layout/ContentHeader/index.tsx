import headerLogo from '@/assets/image/headerLogo.png';
import { getUserInfo } from '@/utils/user';
import { MenuOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar } from 'antd';
export default function index(props: any) {
  const { accountsInfoData, setAccountsInfoData } = useModel(
    'accountsInfo',
    (model: any) => ({
      accountsInfoData: model.accountsInfoData,
      setAccountsInfoData: model.setAccountsInfoData,
    }),
  );
  const pushInfo = () => {
    setAccountsInfoData(getUserInfo());
    history.push('/accounts/valluna-accounts/account-details');
  };
  return (
    <div className="z-50 ">
      <div className="z-50 fixed bg-card-bg left-0 w-full h-[70px]  p-4 text-white  flex justify-between top-0">
        <div className="flex justify-start">
          <MenuOutlined className="cursor-pointer text-2xl mr-4" />
          <img src={headerLogo} width={303} height={45} alt="" />
        </div>
        <div>
          <Avatar
            size={45}
            className="bg-btn-bg cursor-pointer"
            onClick={pushInfo}
          >
            V
          </Avatar>
        </div>
      </div>
    </div>
  );
}
