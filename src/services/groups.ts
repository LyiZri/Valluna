import { requestDataWrap } from '@/utils/request';
import { request } from 'umi';

export const getGroupsList = (data:any) =>{
    return request("/api/groups/list",{
        method:"POST",
        data:requestDataWrap(data)
    })
}
export const getGroupsInfo = async (data:any) =>{
    return request("/api/groups",{
        method:"POST",
        data:requestDataWrap(data)
    })
}
export const groupMassUpload = async (data:any) =>{
    return request("/api/groups/massadd",{
        method:"POST",
        data:requestDataWrap(data)
    })
}
export const groupMassRemove = async (data:any) =>{
    return request("/api/groups/massremove",{
        method:"POST", 
        data:requestDataWrap(data)
    })
}
export const groupRemoveItem = async (data:any)=>{
    return request("/api/groups/remove",{
        method:"POST",
        data:requestDataWrap(data)
    })
}
export const groupsUpdate = async (data:any)=>{
    return request("/api/groups/update",{
        method:"POST",
        data:requestDataWrap(data)
    })
}