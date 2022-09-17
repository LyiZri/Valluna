import ContentHeader from '@/compontents/Layout/ContentHeader';
import { history } from '@umijs/max';
import { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { message } from 'antd';
import LeftMenu from './compontents/Layout/LeftMenu';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}
export function onRouteChange({ location, clientRoutes, routes, action }:any) {
  if(location.pathname.slice(0,6)!='/login' && (!localStorage.getItem("token") || localStorage.getItem("token")=="")){
    localStorage.clear()
    message.warning("Please log in again.")
    history.push("/login/login-page")
  }
  
}
export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    contentStyle: {
      paddingLeft: '300px',
      width:'100vw',
      minHeight:'95vh',
      // paddingTop:'70px',
      marginTop:"10px",
      background:'#272728'
    },
    layout: 'mix',
    siderWidth: 300,
    // pure:true,
    headerRender: ContentHeader,
    headerContentRender: ContentHeader,
    menuRender: LeftMenu,
  };
};
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': "multipart/form-data"
  },
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data }: any = response;
      if (data.code != 1) {
        message.error(data.msg);
      }
      if(data.code == -18){
        localStorage.clear()
        history.push('/login/login-page')
      }
      return response;
    },
  ],

};
