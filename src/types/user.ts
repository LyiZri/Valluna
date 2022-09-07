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
  scholarUserId?: string;
  scholarName?: string;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  groups?: string|number;
  country?: string;
  discordid?: string;
  memberid?: string;
  tags?: IUserTag[];
  memberuserid?: string;
  raddress?: string;
  game?: number;
  regit_time: string;
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