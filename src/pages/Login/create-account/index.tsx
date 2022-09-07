import { useState } from 'react';

import CountryValue from '@/assets/json/language.json';
import Form from '@/compontents/Layout/Form';
import LoginCard from '@/compontents/Layout/LoginCard';
import { ARegister } from '@/services/login';
import { Button, message, Select } from 'antd';
import { history } from 'umi';
import {
  emialVaild,
  passwordVaild,
  reEnterPasswordVaild,
  usernameVaild,
} from '../../../utils/vaildation';
interface formItemType {
  value: string;
  validBind: number;
  placeholderText: string;
  inputType: string;
  valueName: string;
}

export default function CreateAccount() {
  //form vaildation rules
  //default:0,right:1,wrong:2
  const [vaildState, setVaildState] = useState({
    userNameVaild: 0,
    emailVaild: 0,
    passwordVaild: 0,
    reEnterPasswordVaild: 0,
  });
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
    country: 1,
  });
  const [loading, setLoading] = useState(false);
  //Perform from vaildation
  const submitNext = async () => {
    let isPassVaildation = 1;
    let vaildStateCopy = { ...vaildState };
    if (usernameVaild(formValues.username)) {
      vaildStateCopy.userNameVaild = 1;
    } else {
      vaildStateCopy.userNameVaild = 2;
      isPassVaildation = 0;
    }
    if (emialVaild(formValues.email)) {
      vaildStateCopy.emailVaild = 1;
    } else {
      vaildStateCopy.emailVaild = 2;
      isPassVaildation = 0;
    }
    if (passwordVaild(formValues.password)) {
      vaildStateCopy.passwordVaild = 1;
    } else {
      vaildStateCopy.passwordVaild = 2;
      isPassVaildation = 0;
    }
    if (reEnterPasswordVaild(formValues.password, formValues.reenterPassword)) {
      vaildStateCopy.reEnterPasswordVaild = 1;
    } else {
      vaildStateCopy.reEnterPasswordVaild = 2;
      isPassVaildation = 0;
    }
    setVaildState(vaildStateCopy);
    console.log(isPassVaildation);

    if (isPassVaildation == 1) {
      setFormValues({
        username: '',
        email: '',
        password: '',
        reenterPassword: '',
        country: 1,
      });
      setVaildState({
        userNameVaild: 0,
        emailVaild: 0,
        passwordVaild: 0,
        reEnterPasswordVaild: 0,
      });
      setLoading(true);
      try {
        const data = await ARegister({
          ...formValues,
        });
        setLoading(false);
        if (data.code == 1) {
          history.push(`/login/email-otp?email=${formValues.email}`);
        }
      } catch (error:any) {
        setLoading(false);
        message.error(error?error:'pleas try again')
      }
    }
  };
  //   const
  const inputItem: formItemType[] = [
    {
      value: formValues.username,
      validBind: vaildState.userNameVaild,
      placeholderText: 'UserName',
      inputType: '',
      valueName: 'username',
    },
    {
      value: formValues.email,
      validBind: vaildState.emailVaild,
      placeholderText: 'Email',
      inputType: '',
      valueName: 'email',
    },
    {
      value: formValues.password,
      validBind: vaildState.passwordVaild,
      placeholderText: 'Password',
      inputType: 'password',
      valueName: 'password',
    },
    {
      value: formValues.reenterPassword,
      validBind: vaildState.reEnterPasswordVaild,
      placeholderText: 'Re-enter Password',
      inputType: 'password',
      valueName: 'reenterPassword',
    },
  ];
  return (
    <LoginCard>
      <div className="text-white text-center w-96">
        <h2 className="text-xl text-white mb-12">Create an Account </h2>
        <Form
          formItem={inputItem}
          formValueState={formValues}
          changeStateFunc={setFormValues}
          className={'h-1/2'}
        >
          <div className="mb-3">
            <Select
              placeholder="Country"
              className="text-left"
              style={{ width: '100%' }}
            >
              {CountryValue.map((item, index) => {
                return (
                  <Select.Option key={item.code} value={item.english}>
                    {item.english}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="mb-3">
            <Button
              style={{ width: '100%' }}
              type="primary"
              loading={loading}
              className="mt-16 w-full bg-primary-button text-white border-none"
              onClick={submitNext}
            >
              Next
            </Button>
          </div>
        </Form>
      </div>
    </LoginCard>
  );
}
