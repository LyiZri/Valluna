import { ISelectOption } from '@/types/form';
export interface IUserTag {
  value: number;
  text: string;
}
export interface ILanguage {
  language:string
  proficiency:number
}
export interface IUserInfo {
  uid?: string;
  sid?: string;
  account_name?: string;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  groups?: string|number[];
  country?: string;
  discordid?: string;
  memberid?: string|number;
  tags?: IUserTag[];
  memberuserid?: string;
  raddress?: string;
  game?: number;
  gameid?:number;
  regit_time?: string;
  permissons?:string[]
  language?:ILanguage[] | string
  password?:string
  scholarid?:string|number
  gid?:string|number
  gname?:string
  type?:number
  num?:number
  members?:string

}
export const userGroupsData = [
  { value: '1', label: 'Scholar' },
  { value: '2', label: 'Scholar Group A' },
  { value: '3', label: 'Scholar Group B' },
  { value: '4', label: 'Team Lead' },
];
export const proficiencyData = [
    {value:1,label:'Native or Bilingual'},
    {value:2,label:'Limited Working'},
    {value:3,label:'Elementary'}
]
export const searchStatusData= [
    {
        value:'1',label:'linked'
    },
    {
        value:'2',label:'unlinked'
    }
]
export const permissionsData = [
  {value:'1',label:'Member'},
  {value:'2',label:'Scholar'},
  {value:"3",label:''},
]
export const gameData:ISelectOption[] = [
  {value:1,text:"Axie"}
]