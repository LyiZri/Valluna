import { readCSVFile } from '@/utils/downloadFile';
import { Modal } from 'antd';
interface IProps {
  uploadModalStatus: boolean;
  setUploadModalStatus: Function;
  title?: string;
  label?: string;
}

export default function UploadModal({
  uploadModalStatus,
  setUploadModalStatus,
  title = 'upload modal',
  label = '',
}: IProps) {
  const uploadFileDone = (e: any) => {
    console.log(readCSVFile(e));
  };
  return (
    <Modal
      visible={uploadModalStatus}
      onCancel={()=>setUploadModalStatus(false)}
      title={title}
    >
      <h5>{label}</h5>
      <div>
        <input
          type="file"
          onChange={(e) => {
            uploadFileDone(e);
          }}
        />
      </div>
    </Modal>
  );
}
