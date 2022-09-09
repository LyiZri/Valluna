import { useState } from 'react';
import { IUserInfo } from '../types/user';
const scholarInfoState = () =>{
    const [scholarInfo,setScholarInfo] = useState<IUserInfo>({gameid:1})
    return{
        scholarInfo,setScholarInfo
    }
}
export default scholarInfoState