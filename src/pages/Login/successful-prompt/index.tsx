import SuccessPage from '@/compontents/Profession/SuccessfulPage';
import { useEffect } from 'react';
import { history } from '@umijs/max';
export default function SuccessfulReset() {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login/login-page");
    }, 3000);
  });
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="w-full text-center">
        <SuccessPage text="Your password has been changed" />
      </div>
    </div>
  );
}
