import { Button } from 'antd';
import React from 'react';
import { IButtonItem } from '../../../types/form';

interface IProps {
  title: string | React.ReactNode;
  buttonContent: IButtonItem[];
}

export default function ButtonControlBar(props: IProps) {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center py-4 md:justify-between">
      <div className="text-md text-gray-400">{props.title}</div>
      <div>
        {props.buttonContent.map((item: IButtonItem, index: number) => {
          return (
            <Button
              key={index}
              className="ml-4 px-4 border-none rounded-lg bg-purple-button hover:bg-purple-800 focus:bg-purple-800 focus:text-white active:bg-purple-800 active:text-white hover:text-white  text-white"
              onClick={() => {
                item.method();
              }}
            >
              {item.context}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
