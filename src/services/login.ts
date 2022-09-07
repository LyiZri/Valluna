import { request } from "@umijs/max";
import { loginRequestDataWrap } from "@/utils/request";
// 登陆
export async function Alogin(data:any) {
  return request("/api/members/login", {
    method: "POST",
    data:loginRequestDataWrap(data)
  });
}

//注册
export async function ARegister(data:any){
    return request("/api/members/register",{
        method:'POST',
        data:loginRequestDataWrap(data)
    })
}

//注册opt
export async function ARegisterOTP(data:any){
    return request("/api/members/optregister",{
        method:"POST",
        data:loginRequestDataWrap(data)
    })
}

//resetPassword getOPT
export async function AResetPasswordGetOPT(data:any){
    return request("/api/members/resetpassword/getopt",{
        method:"POST",
        data:loginRequestDataWrap(data)
    })
}

//resetPassword verifyopt
export async function AResetPasswordVerifyOPT(data:any){
    return request("/api/members/resetpassword/verifyopt",{
        method:"POST",
        data:loginRequestDataWrap(data)
    })
}

//
export async function resetPassword(data:any){
    return request("/api/members/resetpassword",{
        method:"POST",
        data:loginRequestDataWrap(data)
    })
}