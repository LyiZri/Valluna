import IconFont from '@/compontents/Layout/IconFont';
import routes, { route } from '@/routes';
import { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
interface IChoose {
  index: number;
  tag: number;
}
export default function LeftMenu() {
  const routeChange = (path: string, index: number) => {
    localStorage.setItem(
      'labelChoose',
      JSON.stringify({
        ...labelChoose,
        tag: index,
      }),
    );
    history.push(path);
    setLabelChoose({
      ...labelChoose,
      tag: index,
    });
  };
  const labelChange = (index: number) => {
    localStorage.setItem(
      'labelChoose',
      JSON.stringify({
        ...labelChoose,
        label: index,
      }),
    );
    setLabelChoose({
      ...labelChoose,
      label: index,
    });
  };
  const [labelChoose, setLabelChoose] = useState(() => {
    if (localStorage.getItem('labelChoose')) {
      return JSON.parse(localStorage.getItem('labelChoose') as string);
    } else {
      return {
        label: 2,
        tag: 1,
      };
    }
  });
  return (
    <div
      className={`flex fixed flex-nowrap left-0 top-16  z-10  ${styles.leftMenu}`}
    >
      <div className="flex-shrink-0 p-3 bg-card-bg" style={{ width: '280px' }}>
        <ul className="list-unstyled ps-0">
          {routes.map((item: route, index: number) => {
            if (item.isRender === true) {
              return (
                <li key={index}>
                  <div
                    className={`p-2 rounded flex justify-between text-xl ${
                      labelChoose.label === index
                        ? `bg-left-bar-choose text-white`
                        : `text-white bg-page-bg`
                    }`}
                    onClick={() => {
                      labelChange(index);
                    }}
                    role={'button'}
                  >
                    <p>
                    <IconFont className='text-2xl mr-4 text-white' type={item.icon as string}></IconFont>
                    {item.name}
                    </p>
                    <IconFont
                    className='text-2xl'
                      type={
                        labelChoose.label === index
                          ? 'icon-arrow-down-filling'
                          : 'icon-arrow-up-filling'
                      }
                    ></IconFont>
                  </div>
                  <ul
                    className={` ${styles.menuTransform} btn-toggle-nav  list-unstyled fw-normal pb-1 small `}
                    key={index}
                  >
                    <div
                      className={`px-6 py-4 ${
                        labelChoose.label === index ? `block` : `hidden`
                      }`}
                      key={index}
                    >
                      {item.routes?.map((item1, index1) => {
                        if (!item1.isRender) {
                          return;
                        }
                        return (
                          <li
                            key={index1}
                            className={`p-2 `}
                            onClick={() => {
                              routeChange(item1.path, item1.tag as number);
                            }}
                          >
                            <div
                              role={'button'}
                              className={` ${
                                labelChoose.tag === item1.tag
                                  ? `text-left-bar-choose`
                                  : `text-white`
                              }`}
                            >
                              {item1.name}
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </li>
              );
            } else {
              return;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
