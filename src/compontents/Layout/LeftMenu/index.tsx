import routes, { route } from '@/routes';
import { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
export default function LeftMenu() {
  const routeChange = (path: string, index: number) => {
    history.push(path);
    setLabelChoose({
      ...labelChoose,
      tag: index,
    });
  };
  const [labelChoose, setLabelChoose] = useState({
    label: 2,
    tag: 0,
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
                    className={`p-2 rounded text-xl ${
                      labelChoose.label === index
                        ? `bg-left-bar-choose text-white`
                        : `text-white bg-page-bg`
                    }`}
                    onClick={() => {
                      setLabelChoose({
                        label: index,
                        tag: 0,
                      });
                    }}
                    role={'button'}
                  >
                    {item.name}
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
                        return ;
                      }
                      return (
                          <li
                            key={index1}
                            className={`p-2 `}
                            onClick={() => {
                              routeChange(item1.path, index1);
                            }}
                          >
                            <div
                              role={'button'}
                              className={` ${
                                labelChoose.tag === index1
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
