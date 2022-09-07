const usernameVaild = (username:string)=>{
    if(username === ''){
        return false
    }else{
        return true
    }
}
const emialVaild = (email:string) => {
    const emailReg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
    if(email === '' || !emailReg.test(email)){
        return false
    }else{
        return true
    }
}
const passwordVaild = (password:string) => {
    if(password === ''){
        return false
    }else{
        return true
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
export {usernameVaild,emialVaild,passwordVaild,reEnterPasswordVaild,emailOTPVaild}