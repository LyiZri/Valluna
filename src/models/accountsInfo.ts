import { IUserInfo } from '@/types/user';
import { useEffect, useState } from 'react';

const accountsInfo = () => {
  const [accountsInfoData, setAccountsInfoDataState] = useState<IUserInfo>({});
  const [accountsInfoLanguageData, setAccountsInfoLanguageData] = useState(
    () => {
      if (typeof accountsInfoData.language == 'string') {
        return JSON.parse(accountsInfoData.language as string);
      } else {
        return accountsInfoData.language;
      }
    },
  );
  console.log(accountsInfoData);
  const setAccountsInfoData = (data: IUserInfo) => {
    let userInfo = {...data}
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
    setAccountsInfoLanguageData(accountsInfoData.language);
  }, [accountsInfoData.language]);
  return {
    accountsInfoData,
    setAccountsInfoData,
    accountsInfoLanguageData,
    setAccountsInfoLanguageData,
  };
};
export default accountsInfo;
