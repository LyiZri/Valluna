import { request } from "umi";
import { requestDataWrap } from '@/utils/request';

export async function getScholarsInfoList(data:any) {
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
export async function getScholarInfo(data:any){
  return request("/api/scholars",{
    method:"POST",
    data:requestDataWrap(data)
  })
}
export async function deleteScholarItem(data:any){
  return request("/api/scholars/remove",{
    method:"POST",
    data:requestDataWrap(data)
  })
}

export async function unLinkScholarItem(data:any){
  return request("/api/scholars/link",{
    method:"POST",
    data:requestDataWrap(data)
  })
}