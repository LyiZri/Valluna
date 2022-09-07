
import { useState, useEffect } from 'react';
const theme = ()=>{
    //theme状态持久化
    const [themeIsLight,setThemeIsLight] = useState(()=>{
        if(localStorage.getItem('themeIsLight')===null){
            return true
        }else{
            return JSON.parse(localStorage.getItem('themeIsLight') as string)
        }
    })
    useEffect(()=>{
        localStorage.setItem('themeIsLight',JSON.stringify(themeIsLight))
    },[themeIsLight])
    return{
        themeIsLight,
        setThemeIsLight
    }
}
export default theme