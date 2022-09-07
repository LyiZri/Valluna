import languageJson from '@/assets/json/language.json';
import IconFont from '@/compontents/Layout/IconFont';
import { ILanguage, proficiencyData } from '@/types/user';
import { useModel } from '@umijs/max';
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
}
export default function languageAdd() {
  const [language, setLanguage] = useState({
    language: '',
    proficiency: 1,
  });
  const {
    accountsInfoData,
    setAccountsInfoData,
    accountsInfoLanguageData,
    setAccountsInfoLanguageData
  } = useModel('accountsInfo', (model: any) => ({
    accountsInfoLanguageData: model.accountsInfoLanguageData,
    setAccountsInfoData: model.setAccountsInfoData,
    accountsInfoData: model.accountsInfoData,
    setAccountsInfoLanguageData: model.setAccountsInfoLanguageData,
  }));
  const cancel = (e: number) => {
    const data = accountsInfoLanguageData.splice(e, 1);
    setAccountsInfoData({
      ...accountsInfoData,
      language: accountsInfoLanguageData,
    });
  };
  const getProficiency = (proficiency: number) => {
    const a = proficiencyData.map((item, index) => {
      if (item.value == proficiency) {
        return item.label;
      }
    });
    return a;
  };
  const languageChange = (e: string, index: number) => {
    let languageArr = accountsInfoLanguageData;
    languageArr[index] = {
      ...languageArr[index],
      language: e,
    };
  };
  const proficiencyChange = (e: string, index: number) => {
    let languageArr = accountsInfoLanguageData;
    languageArr[index] = {
      ...languageArr[index],
      proficiency: e,
    };
  };
  useEffect(() => {
    console.log('data=====', accountsInfoLanguageData);
  }, [accountsInfoLanguageData]);
  return (
    <div className="text-center text-white">
      {accountsInfoLanguageData !== null &&
        accountsInfoLanguageData !== undefined &&
        typeof(accountsInfoLanguageData) !== 'string' &&
        accountsInfoLanguageData.length !== 0 &&
        accountsInfoLanguageData.map((item: ILanguage, index: number) => {
          return (
            <div key={item.language}>
              <p className="text-white w-full text-left my-2">Language </p>
              <Select
                showSearch
                placeholder={item.language ? item.language : 'Choose Languages'}
                onChange={(e) => {
                  setLanguage({
                    ...language,
                    language: e,
                  });
                  languageChange(e, index);
                }}
                className="w-full text-left text-white my-2"
              >
                {languageJson.map((item1, index) => {
                  return (
                    <Select.Option
                      key={item1.code}
                      className={'bg-input-content text-white'}
                      value={item1.english}
                    >
                      {item1.english}
                    </Select.Option>
                  );
                })}
              </Select>
              <p className="text-white w-full text-left my-2">Proficiency </p>
              <Select
                showSearch
                placeholder={
                  item.proficiency && item.proficiency !== 0
                    ? getProficiency(item.proficiency)
                    : 'Choose Proficiency'
                }
                className="text-left w-full my-2 text-white"
                onChange={(e) => {
                  setLanguage({
                    ...language,
                    proficiency: e,
                  });
                  proficiencyChange(e, index);
                }}
              >
                <Select.Option value={1}>Native or Bilingual</Select.Option>
                <Select.Option value={2}>Limited Working</Select.Option>
                <Select.Option value={3}>Elementary</Select.Option>
              </Select>
              <div className="flex w-full justify-between mt-2">
                <p></p>
                <Button
                  className="border-none"
                  type="link"
                  icon={<IconFont className="text-2xl" type="icon-shanchu" />}
                  onClick={() => cancel(index)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
