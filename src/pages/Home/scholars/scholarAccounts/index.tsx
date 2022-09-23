import ContentEmpty from '@/compontents/Layout/ContentEmpty';
import IconFont from '@/compontents/Layout/IconFont';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import {
  deleteScholarItem,
  getScholarsInfoList,
  massCreateScholar,
  massLinkScholar,
  massUnLinkScholar,
  massUploadFile,
  unLinkScholarItem,
} from '@/services/scholars';
import { IFormItem } from '@/types/form';
import { gameData, IUserInfo } from '@/types/user';
import { apiDownloadCsv, downloadCsv } from '@/utils/downloadFile';
import { timestampToTime } from '@/utils/format';
import { history, useModel } from '@umijs/max';
import { Button, message, Modal, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import HeaderBar from './compontents/headerBar';
import LinkTable from './compontents/linkTable';

interface DataType extends IUserInfo {}
interface nextStep {
  confirm: Function;
}
interface ImodalStatus {
  status: boolean;
  title: string;
  type: string;
  render: React.ReactNode;
  nextStep: nextStep;
}

export default function Accounts() {
  //控制model的开关
  const [modalStatus, setModalStatus] = useState<ImodalStatus>({
    status: false,
    title: '',
    type: '',
    render: <></>,
    nextStep: {
      confirm: () => {},
    },
  });
  const [loadingStauts, setLoadingStatus] = useState({
    tableLoading: false,
    confirmLoading: false,
  });
  const { scholarInfo, setScholarInfo } = useModel('scholarInfo');
  //文件上传控制器
  let inputRef: any;
  //上传的文件
  let inputfile: any;

  const uploadFile = () => {
    inputRef.click();
  };
  const getFile = async (e: any) => {
    inputfile = e;
    setFileValue(e);
  };
  // 传给model当前列数据
  const [modalValue, setModalValue] = useState<DataType>();
  // model的步骤
  const [stepNum, setStepNum] = useState(1);
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  let pageNum = 1;

  let searchData = {};

  const [list, setList] = useState<IUserInfo[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getList();
      setList(res);
    })();
  }, []);
  const getList = async () => {
    setLoadingStatus({
      ...loadingStauts,
      tableLoading: true,
    });
    try {
      const data = await getScholarsInfoList({
        ...pageData,
        ...searchData,
        page: pageNum,
      });
      setLoadingStatus({
        ...loadingStauts,
        tableLoading: false,
      });
      if (data.code == 1) {
        return data.data.list;
      }
    } catch (error) {
      setLoadingStatus({
        ...loadingStauts,
        tableLoading: false,
      });
    }
  };
  const exportCsv = () => {
    let titleArr: any[] = [];
    let keyArr: any[] = [];
    colums.map((item) => {
      if (item.title != 'Action') {
        titleArr.push(item.title);
        keyArr.push(item.key);
      }
    });
    let downloadlist:DataType[] = []
    if(selectedRowKeys.length == 0){
      downloadlist = list
    }else{
      selectedRowKeys.map((item,_)=>{
        downloadlist.push(list[((item as number)-1)])
      })
    }
    downloadCsv(downloadlist, titleArr, keyArr);
  };
  const colums: ColumnsType<DataType> = [
    {
      title: 'Scholar ID',
      dataIndex: 'sid',
      key: 'sid',
    },
    {
      title: 'Scholar Name',
      dataIndex: 'account_name',
      key: 'account_name',
    },
    {
      title: 'Wallet',
      dataIndex: 'raddress',
      key: 'raddress',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Game',
      dataIndex: 'gameid',
      key: 'gameid',
      render: (_, { gameid }) => {
        let gameName = '';
        gameData.map((item, index) => {
          if (item.value == gameid) {
            gameName = item.text;
          }
        });
        return (
          <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
            {gameName}
          </Tag>
        );
      },
    },
    {
      title: 'Creation Date',
      dataIndex: 'regit_time',
      key: 'regit_time',
      render: (_, { regit_time }) => {
        return typeof regit_time == 'number' ? (
          <p>{timestampToTime(regit_time)}</p>
        ) : (
          <p>-</p>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'memberid',
      key: 'memberid',
      render: (_, { memberid }) => {
        if (memberid) {
          return (
            <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
              Linked
            </Tag>
          );
        } else {
          return (
            <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
              Unlinked
            </Tag>
          );
        }
      },
    },
    {
      title: 'Tag',
      dataIndex: 'groups',
      key: 'groups',
      render: (_, { groups }) => {
        return (
          <>
            {typeof groups == 'string' || groups == undefined ? (
              <Tag className="bg-gray-button text-white px-4 py-2 border-none rounded">
                -
              </Tag>
            ) : (
              groups.map((tag: number, index: number) => {
                if (tag == 1) {
                  return (
                    <Tag
                      className="bg-gray-button text-white px-4 py-2 border-none rounded"
                      key={index}
                    >
                      {tag}
                    </Tag>
                  );
                } else if (tag == 2) {
                  return (
                    <Tag
                      className="bg-gray-button text-white px-4 py-2 border-none rounded"
                      key={index}
                    >
                      {tag}
                    </Tag>
                  );
                } else {
                  return (
                    <Tag
                      className="bg-gray-button text-white px-4 py-2 border-none rounded"
                      key={index}
                    >
                      {tag}.other
                    </Tag>
                  );
                }
              })
            )}
          </>
        );
      },
    },
    {
      title: 'Member User ID',
      dataIndex: 'memberid',
      key: 'memberid',
    },

    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              className="p-1"
              onClick={() => {
                setScholarInfo(record);
                history.push(
                  `/scholars/scholar-accounts/create-new-scholar-account?sid=${record.sid}`,
                );
              }}
            >
              <IconFont type="icon-bianji" className="text-2xl"></IconFont>
            </Button>
            <Button
              className="p-1"
              type="link"
              onClick={() => {
                linkedStatusChange(record);
              }}
            >
              {record.memberid == '' || record.memberid == 0 ? (
                <IconFont
                  type="icon-tianjiayonghu"
                  className="text-2xl"
                ></IconFont>
              ) : (
                <IconFont
                  type="icon-jianshaoyonghu"
                  className="text-2xl"
                ></IconFont>
              )}
            </Button>
            <Button
              className="p-1"
              type="link"
              onClick={() => {
                deleteItem(record);
              }}
            >
              <IconFont type="icon-shanchu" className="text-2xl"></IconFont>
            </Button>
          </>
        );
      },
    },
  ];
  const searchItem: IFormItem[] = [
    {
      name: 'sid',
      type: 'input',
      col: 2,
      placeholder: 'Scholar ID',
    },
    {
      name: 'account_name',
      type: 'input',
      col: 2,
      placeholder: 'Scholar Account Name',
    },
    {
      name: 'raddress',
      type: 'input',
      col: 2,
      placeholder: 'Wallet',
    },
    {
      name: 'email',
      type: 'input',
      col: 2,
      placeholder: 'Email',
    },
    {
      name: 'status',
      type: 'status-groups',
      col: 3,
      placeholder: 'Status',
    },
    {
      name: 'groups',
      type: 'groups-select',
      col: 3,
      placeholder: 'Groups',
    },
    {
      name: 'uid',
      type: 'input',
      col: 2,
      placeholder: 'User ID',
    },
    {
      name: '',
      type: 'link-reset',
      col: 1,
      icon: 'icon-shuaxin',
    },
    {
      name: '',
      type: 'link-submit',
      col: 1,
      icon: 'icon-chazhao',
    },
    {
      name: 'col',
      type: 'col',
      col: 3,
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button
          className="  border-none rounded-lg bg-purple-button hover:bg-purple-800 hover:text-white  text-white"
          onClick={exportCsv}
        >
          export
        </Button>
      ),
    },
  ];
  const unlinkScholar = async (
    sid: string | undefined,
    uid: string | undefined,
  ) => {
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:true
    })
    if (sid == undefined || uid == undefined) {
      message.error('Can not find user ID or scholar ID');
      return;
    }
    try {
    const data = await unLinkScholarItem({
      sid,
      uid,
      type: 'unlink',
    });
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:false
    })
    if (data.code == 1) {
      confirmClick(
        true,
        <div className="text-center">
          <p className="text-white text-center w-full text-2xl mb-16">
            success
          </p>
          <p className="text-gray-500 text-lg mb-100 w-full text-center">
            Scholar Account ID ({sid}) has been unlinked from Member Account(
            {uid})
          </p>
          <IconFont className="text-9xl" type={'icon-success'}></IconFont>
        </div>,
      );
    }
  } catch (error) {
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:false
    })   
  }
  };
  const [fileValue, setFileValue] = useState<File>();
  const linkedStatusChange = (value: DataType) => {
    if (value.memberid == '') {
      modalClickItem(
        value,
        true,
        'ConfirmationLink',
        '',
        <div>
          <LinkTable memberUserId={value.memberid as string}></LinkTable>
        </div>,
        <div>
          <p className="text-2xl text-white ">Confirmation </p>
          <p className="text-xl my-32">
            Are you sure you wish to unlink Scholar Account lD ({value.sid})
            from Menmber Account ({value.memberid})?
          </p>
          <div className="px-32 mt-32 flex justify-between">
            <Button
              onClick={modalCancel}
              className="px-12 bg-gray-button hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
            >
              Cancel
            </Button>
            <Button
              loading={loadingStauts.tableLoading}
              onClick={() => deleteConfirm(value.sid)}
              className="ml-4 px-12 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
            >
              Confirm
            </Button>
          </div>
        </div>,
      );
    } else {
      modalClickItem(
        value,
        true,
        'ConfirmationUnlink',
        '',
        <div>
          <p className="text-2xl text-white ">Confirmation </p>
          <p className="text-xl my-32">
            Are you sure you wish to unlink Scholar Account lD ({value.sid})
            from Menmber Account ({value.memberid})?
          </p>
          <div className="px-32 mt-32 flex justify-between">
            <Button
              onClick={modalCancel}
              className="px-12 bg-gray-button hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                unlinkScholar(value.sid, value.memberid as string);
              }}
              loading={loadingStauts.tableLoading}
              className="ml-4 px-12 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
            >
              Confirm
            </Button>
          </div>
        </div>,
        <div>
          <p>
            Sochlar Account ID({value?.sid}) has been unlinked from Menmber
            Account ({value.sid})
          </p>
        </div>,
      );
    }
  };
  const modalClickItem = (
    value: DataType,
    nextStatus: boolean,
    title: string,
    type: string,
    firstStepRender: React.ReactNode,
    nextStepRender: React.ReactNode,
  ) => {
    setModalValue(value);
    setModalStatus({
      ...modalStatus,
      status: true,
      title,
      type,
      render: <>{firstStepRender}</>,
      nextStep: {
        confirm: () => {
          confirmClick(nextStatus, <>{nextStepRender}</>);
        },
      },
    });
  };
  const deleteConfirm = async (sid: string | undefined) => {
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:true
    })
    if (sid == undefined) {
      message.warning('The current user does not exist');
      return;
    }
    try {
    const data = await deleteScholarItem({ sid: sid });
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:false
    })
    if (data.code == 1) {
      confirmClick(
        true,
        <div className="text-center">
          <p className="text-white text-2xl mb-16">success</p>
          <p className="text-gray-500 text-lg mb-100">
            Scholar Account lD ({sid}) has been deleted{' '}
          </p>
          <IconFont className="text-9xl" type={'icon-success'}></IconFont>
        </div>,
      );
      const res =  await getList();
      setList(res)
    }
  } catch (error) {
    setLoadingStatus({
      ...loadingStauts,
      confirmLoading:false
    })
  }
  };
  const deleteItem = (value: DataType) => {
    modalClickItem(
      value,
      false,
      'Confirmation',
      '',
      <div>
        <div className="text-2xl text-white mb-32">Confirmation </div>
        <p className="text-lg text-gray-500 mb-2">
          Are you sure you wish to delete Scholor Account ID(
          {value?.sid})
        </p>
        <p className="text-lg text-gray-500 mb-2">
          This action cannot be undone and will also unlink any Member Accounts
        </p>
        <div className="px-32 mt-32 flex justify-between">
          <Button
            onClick={modalCancel}
            className="px-12 bg-gray-button hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white"
          >
            Cancel
          </Button>
          <Button
            loading={loadingStauts.tableLoading}
            onClick={() => deleteConfirm(value.sid)}
            className="ml-4 px-12 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
          >
            Confirm
            </Button>
        </div>
      </div>,
      <div>
        <p>
          Sochlar Account ID({value?.sid}) has been unlinked from Menmber
          Account ({value.sid})
        </p>
      </div>,
    );
  };
  //点击Modal中confirm时
  const confirmClick = (status: boolean, renderChildren: React.ReactNode) => {
    setStepNum(2);
    setModalStatus({
      ...modalStatus,
      status: true,
      title: status ? 'success' : 'Error',
      render: <>{renderChildren}</>,
    });
  };
  const search = async (values: any) => {
    searchData = values;
    const res = await getList();
    setList(res);
  };
  const pageChange = async (e: any) => {
    if (list.length > (e - 1) * 10) {
      pageNum = e;
    } else {
      pageNum = e;
      const res = await getList();
      setList(list.concat(res));
    }
  };
  const uploadClick = async () => {
    if (fileValue?.type != 'text/csv' || !fileValue) {
      message.error('Upload the CSV file correctly');
      return;
    }
    try {
      const data = await massUploadFile(fileValue);
      let res: any;
      if (modalStatus.title == 'masscreate') {
        res = await massCreateScholar({ filename: data.data.file_name });
      } else if (modalStatus.title == 'masslink') {
        res = await massLinkScholar({ filename: data.data.file_name });
      } else if (modalStatus.title == 'massunlink') {
        res = await massUnLinkScholar({ filename: data.data.file_name });
      }
      if (data) {
        confirmClick(
          true,
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
          </div>,
        );
      } else {
        confirmClick(
          true,
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
          </div>,
        );
      }
    } catch (error) {
      message.warning('Upload files according to the template');
    }
  };
  const modalCancel = async () => {
    setModalStatus({
      ...modalStatus,
      status: false,
    });
    setStepNum(1);
    const res = await getList();
    setList(res)
  };
  const downloadTemplate = (type: string) => {
    if (type == 'masscreate') {
      apiDownloadCsv('Template', [
        [
          'Scholar Name*',
          'Game*',
          'Wallet Address*',
          'Email*',
          'Email Password*',
          'User ID',
        ],
        ['A', 'Axie', 'xxx', 'xxx', 'xxx', ''],
      ]);
    } else {
      apiDownloadCsv('Template', [
        ['Scholar ID', 'User ID'],
        ['xxx', 'xxx'],
      ]);
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  
  return (
    <div>
      <HeaderBar modalClickItem={modalClickItem}></HeaderBar>
      <SearchBar search={search} searchItem={searchItem} />
      <ContentEmpty>
        <Table
          loading={loadingStauts.tableLoading}
          rowClassName={'bg-bar-bg text-white bg-card-bg'}
          rowKey={'sid'}
          columns={colums}
          rowSelection={rowSelection}
          dataSource={list}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            itemRender: itemRender,
            total: pageData.size,
            onChange: (e) => {
              pageChange(e);
            },
          }}
        />
      </ContentEmpty>
      {/* </ContentCard> */}
      <Modal
        visible={modalStatus.status}
        onCancel={modalCancel}
        width={modalStatus.title == 'ConfirmationLink' ? 1200 : 600}
        className={'text-white rounded-2xl'}
        okText={'Confirm'}
        bodyStyle={
          modalStatus.type == 'file'
            ? {
                borderRadius: '16px',
                borderTop: '4px solid #8359ba',
                borderBottom: '4px solid #8359ba',
              }
            : {
                borderRadius: '16px',
              }
        }
        destroyOnClose={true}
        footer={null}
        closeIcon={<IconFont type="icon-close" className="text-2xl"></IconFont>}
      >
        {stepNum == 1 && (
          <div className="text-center">
            {modalStatus.render}

            {/* 如果是文件类型上传的modal 则展示 */}
            {modalStatus.type == 'file' && (
              <>
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
                    onClick={() => downloadTemplate(modalStatus.title)}
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
              </>
            )}
          </div>
        )}
        {stepNum == 2 && <div>{modalStatus.render}</div>}
      </Modal>
    </div>
  );
}
