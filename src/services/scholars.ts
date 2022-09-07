import { request } from "umi";
import { requestDataWrap } from '@/utils/request';

export async function getScholarsInfo(data:any) {
  return request("/api/scholars/list", {
    method: "POST",
    data:requestDataWrap(data)
  });
}