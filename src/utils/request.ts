export const requestDataWrap = (data:any)=>{
    const token = localStorage.getItem('token')
    return {data:JSON.stringify({...data,token:token})}
}
export const loginRequestDataWrap = (data:any)=>{
    return {data:JSON.stringify(data)}
}