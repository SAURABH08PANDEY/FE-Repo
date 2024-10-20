import React from "react";
import LoginSignup from "../pages/LoginSignup";
import { useSelector } from "react-redux";

function AuthWrapper(props) {
  const userToken = useSelector(
    (state) => state?.testSlice?.otpVerification?.token
  );
  const { isLoading } = useSelector((state) => state?.testSlice?.verifyToken);
  return <>{!isLoading && userToken ? props.children : <LoginSignup />}</>;
}

export default AuthWrapper;
