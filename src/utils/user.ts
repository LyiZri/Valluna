export const getUserInfo = () =>{
    return JSON.parse(localStorage.getItem('valluna.user-info') || '')
}