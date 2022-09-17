const usernameVaild = (rule:any,value:string,callback:Function)=>{
    if(value === ''){
        callback("Please enter a username")
    }else{
        callback()
    }
}
const emialVaild = (rule:any,value:string,callback:Function) => {
    const emailReg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
    if(value == "" || !value){
        callback("Please enter an email")
    }else if(!emailReg.test(value)){
        callback("Invalid email format")
    }else{
       callback()
    }
}
const passwordVaild = (rule:any,value:string,callback:Function) => {
    if(value === '' || !value){
        callback("Please enter a password")
    }else{
        callback()
    }
}
const raddressVaild = (rule:any,value:string,callback:Function) =>{
    if(value == '' || !value){
        callback("Invalid Ronin Wallet Address")
    }else{
        callback()
    }
}
const countryValid = (rule:any,value:string,callback:Function) => {
    if(value == ''){
        callback("Please select a country ")
    }else{
        callback()
    }
}
const reEnterPasswordVaild = (password:string,reEnterPassword:string) =>{
    if (reEnterPassword === password){
        return true
    }else{
        return false
    }
}
const emailOTPVaild = (code:string) => {
    if(code.length!==6){
        return false
    }else{
        return true
    }
}
const OTPValid = (rule:any,value:string,callback:Function)=>{
    if(value.length!=6){
        callback("Wrong OTP code")
    }else{
        callback()
    }
}
export {usernameVaild,raddressVaild,OTPValid,countryValid,emialVaild,passwordVaild,reEnterPasswordVaild,emailOTPVaild}