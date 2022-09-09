import { PaginationProps } from "antd";
import IconFont from "../IconFont";

//页码左右
export  const itemRender:PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <div className='bg-input-content'>
      <IconFont type='icon-xiajiantou' className='rotate-90'></IconFont>;
      </div>
    }
    if (type === 'next') {
      return <div className='bg-input-content'>
        <IconFont type='icon-xiajiantou' className='-rotate-90'></IconFont>;
        </div>
    }
    return originalElement;
  };