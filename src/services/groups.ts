import { requestDataWrap } from '@/utils/request';
import { request } from 'umi';

export const getGroupsList = (data:any) =>{
    return request("/api/groups/list",{
        method:"POST",
        data:requestDataWrap(data)
    })
}