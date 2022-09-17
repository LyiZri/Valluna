export const getUserInfo = () =>{
    if(localStorage.getItem('valluna.user-info')){
        return JSON.parse(localStorage.getItem('valluna.user-info') as string)
    }else{
        return {}
    }
}