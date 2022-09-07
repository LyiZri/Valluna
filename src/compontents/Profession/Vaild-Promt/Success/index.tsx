import { CheckOutlined } from '@ant-design/icons';

interface Props {
  text: string;
}
export default function Wrong({ text }: Props) {
  return (
    <div className="text-sm mb-2 ">
      <CheckOutlined style={{ color: 'green', fontSize: '24px' }} />
      <span style={{ color: 'green' }} className=" ml-4 ">
        {text}
      </span>
    </div>
  );
}
