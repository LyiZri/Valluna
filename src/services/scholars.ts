import { request } from "umi";
import { requestDataWrap, uploadFilesDataWrap } from '@/utils/request';

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
export async function massCreateScholar(data:any){
  return request("/api/scholars/masscreate",{
    method:"POST",
    data:requestDataWrap(data)
  })
}
export async function massLinkScholar(data:any){
  return request("/api/scholars/masslink",{
    method:"POST",
    data:requestDataWrap(data)
  })
}
export async function massUploadFile(data:any){
  return request("/api/massupload",{
    method:"POST",
    data:uploadFilesDataWrap(data)
  })
}
export async function createUserTag(data:any){
  return request("/api/groups/create",{
    method:"POST",
    data:requestDataWrap(data)
  })
}