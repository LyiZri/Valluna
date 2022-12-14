import { userGroupsData } from '@/types/user';
import { Tag } from 'antd';

interface IProps {
  tagType?: string;
  className?:string
}
export default function UserGroups({ tagType,className='' }: IProps) {
  let userTag = <Tag>-</Tag>;
  userGroupsData.map((item, index) => {
    if (item.value == tagType) {
      userTag = (
        <Tag key={index} className={`className="bg-gray-button text-white px-4 py-2 border-none rounded" ${className}`}>
          {item.label}
        </Tag>
      );
    }
  });
  return userTag
}
