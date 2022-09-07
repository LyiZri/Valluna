import { Input } from "antd";
import React from "react";
import VaildPropmt from "../../Profession/Vaild-Promt/index";
import IconFont from "../IconFont";
interface formItemType {
  value: string;
  validBind: number;
  placeholderText: string;
  inputType: string;
  valueName: string;
  render?:React.ReactNode
}
interface Props {
  formItem: formItemType[];
  changeStateFunc: Function;
  children?: React.ReactNode;
  submit?: React.ReactNode;
  formValueState: Object;
  className:string
}
export default function Form({
  formItem,
  children = <></>,
  changeStateFunc,
  formValueState,
  className = ''
}: Props) {
  const changeStateValue = (valueName: string, value: any) => {
    const formValuesCopy = JSON.parse(JSON.stringify(formValueState));
    formValuesCopy[valueName] = value;
    changeStateFunc(formValuesCopy);
  };
  return (
    <div className={className}>
      {formItem.map((item: formItemType, index: number) => {
        if(item.render){
          return item.render
        }
        return item.inputType == "password" ? (
          <div className="my-4 text-left" key={item.valueName}>
            <Input.Password
              value={item.value}
              className=" border-none bg-input-content text-white w-full"
              iconRender={(visible:boolean)=>{
                return visible?<IconFont type="icon-yanjing_xianshi"></IconFont>:<IconFont type="icon-yanjing_yincang"></IconFont>
              }}
              placeholder={item.placeholderText}
              onChange={(e: any) => {
                changeStateValue(item.valueName, e.target.value);
              }}
            />
            {item.validBind != 0 ? (
              item.validBind == 1 ? (
                <VaildPropmt.Success text="success"></VaildPropmt.Success>
              ) : (
                <VaildPropmt.Wrong text="wrong"></VaildPropmt.Wrong>
              )
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="my-4 text-left" key={item.valueName}>
            <Input
              value={item.value}
              placeholder={item.placeholderText}
              className="bg-input-content text-white rounded-none w-full"
              onChange={(e: any) => {
                changeStateValue(item.valueName, e.target.value);
              }}
            ></Input>
            {item.validBind != 0 ? (
              item.validBind == 1 ? (
                <VaildPropmt.Success text="success"></VaildPropmt.Success>
              ) : (
                <VaildPropmt.Wrong text="wrong"></VaildPropmt.Wrong>
              )
            ) : (
              <p className="mb-2"></p>
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
}
