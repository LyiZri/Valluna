import { useState } from 'react';
import { IUserInfo } from '../types/user';
const groupsInfoModel = () =>{
    const [groupInfo,setGroupInfo] = useState<IUserInfo>({gameid:1})
    return{
        groupInfo,setGroupInfo
    }
}
export default groupsInfoModel