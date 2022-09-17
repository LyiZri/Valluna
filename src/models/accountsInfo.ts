import { IUserInfo } from '@/types/user';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../utils/user';

const accountsInfo = () => {
  const [accountsInfoData, setAccountsInfoDataState] = useState<IUserInfo>(
    () => {
      const userinfo: any = getUserInfo();
      return userinfo;
    },
  );
  const [accountsInfoLanguageData, setAccountsInfoLanguageData] = useState(
    () => {
      if (typeof(accountsInfoData.language) == 'string') {
        
        return JSON.parse(accountsInfoData.language);
      } else {
        return accountsInfoData.language;
      }
    },
  );
  const setAccountsInfoData = (data: IUserInfo) => {
    let userInfo = { ...data };
    if (typeof userInfo.language == 'string') {
      userInfo = {
        ...data,
        language: JSON.parse(userInfo.language),
      };
    }
    setAccountsInfoDataState(userInfo);
    setAccountsInfoLanguageData(userInfo.language);
  };
  useEffect(() => {
    if (typeof(accountsInfoData.language) == 'string') {
      setAccountsInfoLanguageData(JSON.parse(accountsInfoData.language));
    }else{
      setAccountsInfoLanguageData(accountsInfoData.language);
    }
  }, [accountsInfoData.language]);
  return {
    accountsInfoData,
    setAccountsInfoData,
    accountsInfoLanguageData,
    setAccountsInfoLanguageData,
  };
};
export default accountsInfo;
