import React from "react";
import { Button, Form, PageHeader } from "antd";
import { IFormItem } from "@/types/form";
import { Input } from "antd";
import ContentCard from "@/compontents/Layout/ContentCard/index";
import ContentForm from "@/compontents/Layout/ContentForm/index";

export default function accountDetails() {
  const item: IFormItem[] = [
    {
      name: "userId",
      label: "User ID",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "userName",
      label: "Username",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "eamil",
      label: "Email",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "firstName",
      label: "First Name",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "lastName",
      label: "Last Name",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "country",
      label: "Country",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "discordId",
      label: "Discord ID",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "walletAddress",
      label: "Ronin Wallet Address",
      value: "",
      require: false,
      type: "input",
    },
    {
      name: "language",
      label: "Language",
      value: "",
      require: false,
      type: "button",
      children: (
        <div>
          <Input />
          <Input />
        </div>
      ),
    },
  ];
  const permimssionsItem: IFormItem[] = [
    {
      name: "roles",
      label: "Roles",
      value: "",
      require: false,
      type: "input",
    },
  ];
  const tagsItem: IFormItem[] = [
    {
      name: "tags",
      label: "Tags",
      value: "",
      require: false,
      type: "input",
    },
  ];
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        title="Title"
        subTitle="This is a subtitle"
      />
      <ContentCard label="Basic Infomation">
        <ContentForm
          onFinish={() => {}}
          formItem={item}
        ></ContentForm>
      </ContentCard>
      <ContentCard label="Permisssions">
        <ContentForm
          onFinish={() => {}}
          formItem={permimssionsItem}
        ></ContentForm>
      </ContentCard>
      <ContentCard label="Tags">
        <ContentForm
          onFinish={() => {}}
          formItem={tagsItem}
        ></ContentForm>
      </ContentCard>
    </div>
  );
}
