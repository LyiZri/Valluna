import { CheckCircleOutlined } from '@ant-design/icons';

interface IProps {
  text: string;
}
export default function SuccessPage({ text }: IProps) {
  return (
    <div className="text-white flex w-1/2 m-auto flex-row justify-center p-16 bg-black rounded-xl">
      <div className="h-full w-full text-center text-xl">
        <CheckCircleOutlined className="mb-6 text-purple-500" style={{ fontSize: '80px' }} />
        <h2 className="mb-6 text-white text-2xl">Success!</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
