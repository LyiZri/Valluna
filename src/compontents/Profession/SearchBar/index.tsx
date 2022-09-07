import { IFormItem } from '@/types/form';
import ContentForm from '../../Layout/ContentForm/index';

interface IProps {
  searchBarItem: IFormItem[];
  children?:any
}
export default function SearchBar({ searchBarItem,children }: IProps) {
  const layoutObj={  }
  return (
    <div>
      <ContentForm
        onFinish={(e: any) => {
          console.log(e);
        }}
        layoutObj={layoutObj}
        formItem={searchBarItem}
        layout="inline"
      >
        {children}
      </ContentForm>
    </div>
  );
}
