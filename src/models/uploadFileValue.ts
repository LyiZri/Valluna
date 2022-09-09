// 全局共享数据示例
import { useState } from 'react';

const uploadFileValue = () => {
  const [fileValue, setFileValue] = useState();
  const [csvValue, setCsvValue] = useState();
  const setFValue = (data:any) => {
    setCsvValue(data)
  }
  return { fileValue,setFValue, setFileValue, csvValue, setCsvValue };
};

export default uploadFileValue;
