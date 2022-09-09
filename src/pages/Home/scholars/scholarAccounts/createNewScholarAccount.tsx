import { Button, PageHeader,message } from "antd";
import React, { useState } from "react";
import ContentForm from "@/compontents/Layout/ContentForm/index";
import { IFormItem } from "@/types/form";
import ContentCard from "@/compontents/Layout/ContentCard";
import { createScholar } from "@/services/scholars";
import { gameData } from "@/types/user";
export default function createNewScholarAccount() {
  const [loading,setLoading] = useState(false)
  const formItem: IFormItem[] = [
    {
      name: "account_game",
      label: "Scholar Name",
      require: false,
      value: "",
      type: "input",
      placeholder:"Scholar Name"
    },
    {
      name: "gameid",
      label: "Game",
      value: "Axie",
      require: true,
      type: "select",
      placeholder:'Axie',
      selectOption:gameData

    },
    {
      name: "raddress",
      label: "Wallet Address",
      require: true,
      value: "",
      type: "input",
      placeholder:'Wallet Address'
    },
    {
      name: "email",
      label: "Email",
      require: true,
      value: "",
      type: "input",
      placeholder:"Email"
    },
    {
      name: "password",
      label: "Email Password",
      require: true,
      value: "",
      type: "password",
      placeholder:"Email Password"
    },
    {
      name: "memberid",
      label: "Link to a Member Account",
      require: false,
      value: "",
      type: "input",
      placeholder:"User ID"
    },
  ];
  const onFinish = async(values: any) => {
    setLoading(true)
    try {
      const data = await createScholar(values)
      if(data.code == 1){
        message.success("Success!")
      }
    } catch (error) {
      
    }
    setLoading(false)
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
            <Button className=" bg-gray-button px-4 hover: text-white rounded-lg hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white" htmlType="reset" >Cancel</Button>
            <Button className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"htmlType="submit">Save</Button>
            </>
        </ContentForm>
      </ContentCard>
    </div>
  );
}
