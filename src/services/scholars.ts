import { request } from "umi";
import { requestDataWrap } from '@/utils/request';

export async function getScholarsInfo(data:any) {
  return request("/api/scholars/list", {
    method: "POST",
    data:requestDataWrap(data)
  });
}
export async function createScholar(data:any){
  return request("/api/scholars/create",{
    method:"POST",
    data:requestDataWrap(data)
  })
}