import { Button, PageHeader } from "antd";
import React from "react";
import ContentForm from "@/compontents/Layout/ContentForm/index";
import { IFormItem } from "@/types/form";
import ContentCard from "@/compontents/Layout/ContentCard";
export default function createNewScholarAccount() {
  const formItem: IFormItem[] = [
    {
      name: "game",
      label: "Game",
      value: "",
      require: true,
      type: "select",
    },
    {
      name: "walletAddress",
      label: "Wallet Address",
      require: true,
      value: "",
      type: "input",
    },
    {
      name: "eamil",
      label: "Email",
      require: true,
      value: "",
      type: "input",
    },
    {
      name: "emailPassword",
      label: "Email Password",
      require: true,
      value: "",
      type: "password",
    },
    {
      name: "scholarAccountName",
      label: "Scholar Account Name",
      require: false,
      value: "",
      type: "input",
    },
    {
      name: "linkToAMemberAccount",
      label: "Link to a Member Account",
      require: false,
      value: "",
      type: "input",
    },
  ];
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        title="Create New Scholar Account"
        subTitle=""
      />
      <ContentCard label="">
        <ContentForm formItem={formItem} onFinish={onFinish}>
            <>
            <Button className="rounded" htmlType="reset" >Cancel</Button>
            <Button className="rounded mx-2" type="primary" htmlType="submit">Save</Button>
            </>
        </ContentForm>
      </ContentCard>
    </div>
  );
}
