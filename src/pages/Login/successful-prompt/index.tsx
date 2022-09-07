import React, { useEffect } from "react";
import SuccessPage from "@/compontents/Profession/SuccessfulPage";
import { history } from "umi";
import LoginCard from "@/compontents/Layout/LoginCard";
export default function SuccessfulReset() {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  });
  return (
    <LoginCard>
      <SuccessPage text="Your password has been changed" />
    </LoginCard>
  );
}
