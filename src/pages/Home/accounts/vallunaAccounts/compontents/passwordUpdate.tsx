import { Button, Input, message } from "antd";
import { useState } from "react";
import { changePassword } from '@/services/members';
interface IProps{
    modalStatus:Object
    setModalStatus:Function
}

export default function PasswordUpdate ({modalStatus, setModalStatus}:IProps){
    const [loading, setLoading] = useState(false);
    const [passwordValue, setPasswordValue] = useState({
      currentPassword: '',
      newPassword: '',
      reEnterPassword: '',
    });
    const [warningStatus, setWarningStatus] = useState({
      isWarnning: false,
      text: '',
    });
    const cancel = () => {
      setPasswordValue({
        currentPassword: '',
        newPassword: '',
        reEnterPassword: '',
      });
      setModalStatus({
        ...modalStatus,
        open: false,
      });
    };
  
    const submit = async () => {
      if (passwordValue.currentPassword == '') {
        setWarningStatus({
          isWarnning: true,
          text: 'Please enter current password correctly',
        });
        return;
      } else if (passwordValue.newPassword == '') {
        setWarningStatus({
          isWarnning: true,
          text: 'Please enter new password correctly',
        });
        return;
      } else if (passwordValue.reEnterPassword == '') {
        setWarningStatus({
          isWarnning: true,
          text: 'Ensure that the two passwords are the same',
        });
        return;
      }
      setLoading(true);
      const data = await changePassword({
        oldpassword: passwordValue.currentPassword,
        newpassword: passwordValue.newPassword,
      });
      if (data.code == 1) {
        message.success('Success');
        setLoading(false);
        setModalStatus({
          ...modalStatus,
          open: false,
        });
      }
      setLoading(false);
    };
    return (
      <div className="text-center text-white">
        <h2 className="mb-4 text-white">Update your password </h2>
        <h3 className="mb-4 text-white">
          Enter your current password and a new password{' '}
        </h3>
        <Input.Password
          className="border-none bg-input-content text-white mb-4"
          value={passwordValue.currentPassword}
          onChange={(e) => {
            setPasswordValue({
              ...passwordValue,
              currentPassword: e.target.value,
            });
          }}
          placeholder="Current Password "
        />
        <Input.Password
          className="border-none bg-input-content text-white mb-4"
          value={passwordValue.newPassword}
          onChange={(e) => {
            setPasswordValue({
              ...passwordValue,
              newPassword: e.target.value,
            });
          }}
          placeholder="New Password "
        />
        <Input.Password
          className="border-none bg-input-content text-white mb-4"
          value={passwordValue.reEnterPassword}
          onChange={(e) => {
            setPasswordValue({
              ...passwordValue,
              reEnterPassword: e.target.value,
            });
          }}
          placeholder="Confirm New Password "
        />
        {warningStatus.isWarnning && <p>{warningStatus.text}</p>}
        <div className="w-full flex justify-between">
          <Button
            onClick={cancel}
            className="text-white border-none bg-input-content"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            className="border-none bg-btn-bg hover:bg-purple-800 hover:text-white  text-white"
            onClick={submit}
          >
            Done
          </Button>
        </div>
      </div>
    );
  };