import React, { useState } from "react";
import ContentCard from "@/compontents/Layout/ContentCard";
import { Col, Form, Modal, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { timestampToTime } from "@/utils/format";
import { Button } from "antd";
import { downloadCsv } from "@/utils/downloadFile";
import SearchBar from './compontents/searchBar'
import index from "../../scholars/index";
import { history, Outlet } from "umi";
import HeaderBar from './compontents/headerBar'
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

interface DataType {
  scholarId: string;
  scholarName: string;
  email: string;
  game: string;
  firstName: string;
  lastName: string;
  tags: number[];
  country: string;
  memberUserId: string;
  creationDate: string;
  status: boolean;
}
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
    title: "",
    render: <></>,
    nextStep: {
      confirm: () => {},
    },
  });
  // 传给model当前列数据
  const [modalValue, setModalValue] = useState<DataType>();
  // model的步骤
  const [stepNum, setStepNum] = useState(1);
  const colums: ColumnsType<DataType> = [
    {
      title: "Scholar ID",
      dataIndex: "scholarId",
      key: "scholarId",
    },
    {
      title: "Scholar Name",
      dataIndex: "scholarName",
      key: "scholarName",
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
      render: (_, { game }) => {
        return <Tag>{game}</Tag>;
      },
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (_, { creationDate }) => {
        return <p>{timestampToTime(creationDate)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        if (status) {
          return <Tag color={"cyan"}>Linked</Tag>;
        } else {
          return <Tag>Unlinked</Tag>;
        }
      },
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => {
        return (
          <>
            {tags.map((tag: number, index: number) => {
              if (tag == 1) {
                return (
                  <Tag color={"cyan"} key={index}>
                    {tag}
                  </Tag>
                );
              } else if (tag == 2) {
                return (
                  <Tag color={"blue"} key={index}>
                    {tag}
                  </Tag>
                );
              } else {
                return (
                  <Tag color={"default"} key={index}>
                    {tag}.other
                  </Tag>
                );
              }
            })}
          </>
        );
      },
    },
    {
      title: "Member User ID",
      dataIndex: "memberUserId",
      key: "memberUserId",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <Button onClick={() => {}} icon={<EditOutlined />}></Button>
            <Button onClick={()=>{
              linkedStatusChange(record)
            }} icon={<UserAddOutlined />} />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteItem(record);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const linkedStatusChange = (value: DataType) => {
    modalClickItem(
      value,
      true,
      "Confirmation",
      <div>
        <p>
          Are you sure you wish to unlink Scholar Account ID(
          {value?.scholarId}) from Member Account ({value.scholarId})
        </p>
      </div>,
      <div>
        <p>
          Sochlar Account ID({value?.scholarId}) has been unlinked from Menmber
          Account ({value.scholarId})
        </p>
      </div>
    );
  };
  const modalClickItem = (
    value: DataType,
    nextStatus: boolean,
    title:string,
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
      "Confirmation",
      <div>
          <p>
            Are you sure you wish to delete Scholor Account ID(
            {value?.scholarId})
          </p>
          <p>
            This action cannot be undone and will also unlink any Member
            Accounts
          </p>
        </div>,
         <div>
         <p>
           Sochlar Account ID({value?.scholarId}) has been unlinked from
           Menmber Account ({value.scholarId})
         </p>
       </div>,
    )
  };
  //点击Modal中confirm时
  const confirmClick = (status: boolean, renderChildren: React.ReactNode) => {
    setStepNum(2);
    setModalStatus({
      ...modalStatus,
      status: true,
      title: status ? "success" : "Error",
      render: <>{renderChildren}</>,
    });
  };
  const data: DataType[] = [
    {
      scholarId: "001",
      scholarName: "a",
      email: "a@b.com",
      firstName: "a",
      lastName: "b",
      game: "axie",
      tags: [1],
      country: "cn",
      status: true,
      memberUserId: "123",
      creationDate: "1660791192000",
    },
    {
      scholarId: "002",
      scholarName: "a",
      email: "a@b.com",
      firstName: "a",
      lastName: "b",
      game: "axie",
      tags: [1],
      country: "cn",
      status: false,
      memberUserId: "123",
      creationDate: "1655185405",
    },
    {
      scholarId: "003",
      scholarName: "a",
      email: "a@b.com",
      firstName: "a",
      lastName: "b",
      game: "axie",
      tags: [1],
      country: "cn",
      status: false,
      memberUserId: "123",
      creationDate: "1655185405",
    },
    {
      scholarId: "005",
      scholarName: "a",
      email: "a@b.com",
      firstName: "a",
      lastName: "b",
      game: "axie",
      tags: [1],
      country: "cn",
      status: false,
      memberUserId: "123",
      creationDate: "1655185405",
    },
    {
      scholarId: "004",
      scholarName: "a",
      email: "a@b.com",
      firstName: "a",
      lastName: "b",
      game: "axie",
      tags: [1],
      country: "cn",
      status: true,
      memberUserId: "123",
      creationDate: "1655185405",
    },
  ];
  const exportCsv = () => {
    let titleArr: any[] = [];
    let keyArr: any[] = [];
    colums.map((item) => {
      if (item.title != "Action") {
        titleArr.push(item.title);
        keyArr.push(item.key);
      }
    });
    downloadCsv(data, titleArr, keyArr);
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
      <ContentCard label="This portal displays all current Vallna Member Accounts">
        <HeaderBar modalClickItem={modalClickItem}></HeaderBar>
        <SearchBar search={search} export={exportCsv}/>

        <Table rowKey={'scholarId'} columns={colums} dataSource={data} scroll={{ x: 1000 }}></Table>
      </ContentCard>
      <Modal
        visible={modalStatus.status}
        title={modalStatus.title}
        onCancel={modalCancel}
        okText={"Confirm"}
        footer={
          stepNum == 1 ? (
            <div>
              <Button onClick={modalCancel}>Cancel</Button>
              <Button
                onClick={() => modalStatus.nextStep.confirm()}
                className="bg-blue-500"
              >
                Confirm
              </Button>
            </div>
          ) : (
            <></>
          )
        }
      >
        {modalStatus.render}
      </Modal>
    </div>
  );
}
