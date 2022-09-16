import IconFont from '@/compontents/Layout/IconFont';
import { massUploadFile } from '@/services/scholars';
import { apiDownloadCsv, readCSVFile } from '@/utils/downloadFile';
import { Button, message, Modal } from 'antd';
import { useState } from 'react';
interface IProps {
  uploadModalStatus: boolean;
  setUploadModalStatus: Function;
  title?: string;
  label?: string;
  uploadFunction: Function;
  templateValue?:any
}

export default function UploadModal({
  uploadModalStatus,
  setUploadModalStatus,
  title = 'upload modal',
  label = '',
  uploadFunction,
  templateValue =  [
    ['Scholar ID', 'User ID'],
    ['xxx', 'xxx'],
  ]
}: IProps) {
  //文件上传控制器
  let inputRef: any;
  //上传的文件
  let inputfile: any;
  const downloadTemplate = () => {
    apiDownloadCsv('Template', templateValue);
  };
  let [renderItem,setRenderItem] = useState<React.ReactNode>();
  const [fileValue, setFileValue] = useState<File>();
  const uploadFileDone = (e: any) => {
    console.log(readCSVFile(e));
  };
  const uploadFile = () => {
    console.log(inputRef.curremt);
    inputRef.click();
  };
  const getFile = async (e: any) => {
    inputfile = e;
    setFileValue(e);
  };
  const uploadClick = async () => {
    if (fileValue?.type != 'text/csv' || !fileValue) {
      message.error('Upload the CSV file correctly');
      return;
    }
    try {
      const data = await massUploadFile(fileValue);
      let res: any;
      res = await uploadFunction({ filename: data.data.file_name });
      if (data) {
        setRenderItem(
          <div className="text-center w-full">
            <p className="text-white text-2xl mb-8">
              Mass Create Scholar Accounts
            </p>
            <p className="text-gray-500 text-lg">
              Some entries failed to be uploaded. Check file for results.
            </p>
            <p className="my-16">
              <IconFont className="text-6xl" type={'icon-warning'}></IconFont>
            </p>
            <p>
              <Button
                onClick={() => {
                  apiDownloadCsv('ErrorMsg', res.data);
                }}
                className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
              >
                Download Results
              </Button>
            </p>
          </div>
        );
      } else {
        setRenderItem(
          <div className="text-center w-full">
            <p className="text-white text-2xl mb-8">
              Mass Create Scholar Accounts
            </p>
            <p className="text-gray-500 text-lg">
              All X entries were successfully created
            </p>
            <p className="my-16">
              <IconFont className="text-6xl" type={'icon-success'}></IconFont>
            </p>
          </div>
        );
      }
    } catch (error) {
      message.warning('Upload files according to the template');
    }
  };
  return (
    <Modal
      visible={uploadModalStatus}
      className={'text-white rounded-2xl'}
      onCancel={() => setUploadModalStatus(false)}
      width={800}
      bodyStyle={{
        borderRadius: '16px',
        borderTop: '4px solid #8359ba',
        borderBottom: '4px solid #8359ba',
      }}
      destroyOnClose={true}
      footer={null}
      closeIcon={<IconFont type="icon-close" className="text-2xl"></IconFont>}
    >
      {!renderItem && (
        <>
          <div className="text-center">
            <p className="text-white text-2xl mb-6">{title}</p>
            <p className="text-white text-xl mb-6">{label}</p>
          </div>
          <div className='text-center'>
            <div
              className="text-2xl  text-purple-500 bg-black mx-16 py-16 cursor-pointer rounded-xl"
              onClick={uploadFile}
            >
              <div>
                {!fileValue && (
                  <p>
                    Drop <span className="text-white"> or </span> Select CSV
                    file
                    <IconFont
                      type="icon-add-files"
                      className="text-5xl font-semibold"
                    ></IconFont>
                  </p>
                )}
                {fileValue && <p>{fileValue.name}</p>}
                <input
                  ref={(el) => {
                    inputRef = el;
                  }}
                  type="file"
                  className="hidden"
                  onChange={(e: any) => {
                    getFile(inputRef.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="mx-16 mt-12 flex justify-between">
              <Button
                onClick={downloadTemplate}
                className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
              >
                Download Template
              </Button>
              <Button
                onClick={uploadClick}
                className="ml-4 px-12 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
              >
                Upload
              </Button>
            </div>
            <input
              type="file"
              className='hidden'
              onChange={(e) => {
                uploadFileDone(e);
              }}
            />
          </div>
        </>
      )}
      {renderItem && renderItem}
    </Modal>
  );
}
