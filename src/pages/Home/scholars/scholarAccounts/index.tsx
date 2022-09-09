import ContentCard from '@/compontents/Layout/ContentCard';
import IconFont from '@/compontents/Layout/IconFont';
import { itemRender } from '@/compontents/Layout/PageContaineriTemRender';
import SearchBar from '@/compontents/Layout/SearchBar';
import { getScholarsInfo } from '@/services/scholars';
import { IFormItem } from '@/types/form';
import { IUserInfo } from '@/types/user';
import { downloadCsv } from '@/utils/downloadFile';
import { timestampToTime } from '@/utils/format';
import { Button, Modal, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import HeaderBar from './compontents/headerBar';

interface DataType extends IUserInfo {}
interface nextStep {
  confirm: Function;
}
interface ImodalStatus {
  status: boolean;
  title: string;
  render: React.ReactNode;
  nextStep: nextStep;
}

export default function Accounts() {
  //控制model的开关
  const [modalStatus, setModalStatus] = useState<ImodalStatus>({
    status: false,
    title: '',
    render: <></>,
    nextStep: {
      confirm: () => {},
    },
  });
  // 传给model当前列数据
  const [modalValue, setModalValue] = useState<DataType>();
  // model的步骤
  const [stepNum, setStepNum] = useState(1);
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  let pageNum = 1;
  const [list, setList] = useState<IUserInfo[]>([]);
  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);
  const getList = async () => {
    try {
      const data = await getScholarsInfo({ ...pageData, page: pageNum });
      if (data.code == 1) {
        setList(data.data.list);
      }
    } catch (error) {}
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
    downloadCsv(list, titleArr, keyArr);
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
        return <Tag>{gameid}</Tag>;
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
          return <Tag color={'cyan'}>Linked</Tag>;
        } else {
          return <Tag>Unlinked</Tag>;
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
              <Tag>-</Tag>
            ) : (
              groups.map((tag: number, index: number) => {
                if (tag == 1) {
                  return (
                    <Tag color={'cyan'} key={index}>
                      {tag}
                    </Tag>
                  );
                } else if (tag == 2) {
                  return (
                    <Tag color={'blue'} key={index}>
                      {tag}
                    </Tag>
                  );
                } else {
                  return (
                    <Tag color={'default'} key={index}>
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
            <Button type="link" className="p-1" onClick={() => {}}>
              <IconFont type="icon-bianji" className="text-2xl"></IconFont>
            </Button>
            <Button
              className="p-1"
              type="link"
              onClick={() => {
                linkedStatusChange(record);
              }}
            >
              {record.memberid == '' ? (
                <IconFont
                  type="icon-jianshaoyonghu"
                  className="text-2xl"
                ></IconFont>
              ) : (
                <IconFont
                  type="icon-tianjiayonghu"
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
      name: 'memberid',
      type: 'input',
      col: 2,
      placeholder: 'Member User ID',
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
  const linkedStatusChange = (value: DataType) => {
    modalClickItem(
      value,
      true,
      'Confirmation',
      <div>
        <p>
          Are you sure you wish to unlink Scholar Account ID(
          {value?.sid}) from Member Account ({value.sid})
        </p>
      </div>,
      <div>
        <p>
          Sochlar Account ID({value?.sid}) has been unlinked from Menmber
          Account ({value.sid})
        </p>
      </div>,
    );
  };
  const modalClickItem = (
    value: DataType,
    nextStatus: boolean,
    title: string,
    firstStepRender: React.ReactNode,
    nextStepRender: React.ReactNode,
  ) => {
    setModalValue(value);
    setModalStatus({
      ...modalStatus,
      status: true,
      title,
      render: <>{firstStepRender}</>,
      nextStep: {
        confirm: () => {
          confirmClick(nextStatus, <>{nextStepRender}</>);
        },
      },
    });
  };
  const deleteItem = (value: DataType) => {
    modalClickItem(
      value,
      false,
      'Confirmation',
      <div>
        <p>
          Are you sure you wish to delete Scholor Account ID(
          {value?.sid})
        </p>
        <p>
          This action cannot be undone and will also unlink any Member Accounts
        </p>
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
  const search = (values: any) => {
    console.log(values);
  };
  const modalCancel = () => {
    setModalStatus({
      ...modalStatus,
      status: false,
    });
    setStepNum(1);
  };
  return (
    <div>
      {/* <ContentCard label="This portal displays all current Vallna Member Accounts"> */}
        <HeaderBar modalClickItem={modalClickItem}></HeaderBar>
        <SearchBar search={search} searchItem={searchItem} />

        <Table
          rowClassName={'bg-bar-bg text-white bg-card-bg'}
          rowKey={'sid'}
          columns={colums}
          dataSource={list}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            itemRender: itemRender,
            total: pageData.size,
            onChange: (e) => {
              pageNum = e;
              getList();
            },
          }}
        ></Table>
      {/* </ContentCard> */}
      <Modal
        visible={modalStatus.status}
        onCancel={modalCancel}
        className={"text-white"}
        okText={'Confirm'}
        bodyStyle={{borderTop:"4px solid purple"}}
        destroyOnClose={true}
        // footer={
        //   stepNum == 1 ? (
        //     <div>
        //       <Button onClick={modalCancel}>Cancel</Button>
        //       <Button
        //         onClick={() => modalStatus.nextStep.confirm()}
        //         className="bg-blue-500"
        //       >
        //         Confirm
        //       </Button>
        //     </div>
        //   ) : (
        //     <></>
        //   )
        // }
        footer={null}
      >
        {modalStatus.render}
      </Modal>
    </div>
  );
}
