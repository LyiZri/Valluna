import { requestDataWrap } from '@/utils/request';
import { request } from 'umi';

export async function changePassword(data: any) {
  return request('/api/members/changepassword', {
    method: 'POST',
    data: requestDataWrap(data),
  });
}
export async function getMembersList(data: any) {
  return request('/api/members/list', {
    method:"POST",
    data: requestDataWrap(data),
  });
}
export async function memberUpdata(data:any){
  return request('/api/members/update',{
    method:"POST",
    data:requestDataWrap(data)
  })
}
