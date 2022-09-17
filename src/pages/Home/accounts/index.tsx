import { useEffect } from 'react';
import { history, Outlet } from 'umi';
export default function index() {
  useEffect(() => {
    // history.push('/accounts/valluna-accounts');
  }, []);
  return (
      <Outlet />
  );
}
