import React, { useState } from "react";
import "../SignupForm/signupForm.scss";
import InputField from "../InputField/InputField";
import Button1 from "../Button/Button1";
import { otpVerification } from "../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";

function OtpVerificationForm() {
  const dispatch = useDispatch();
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const signupData = useSelector((state) => state?.testSlice?.signupData);
  const otpVerificationData = useSelector((state) => state?.testSlice?.otpVerification);

  const handleEmailOtpVerify = () => {
    dispatch(
      otpVerification({
        companyId: signupData?.companyId,
        otp: emailOtp,
        type: "email",
      })
    );
  };

  const handleMobileOtpVerify = () => {
    dispatch(
      otpVerification({
        companyId: signupData?.companyId,
        otp: mobileOtp,
        type: "phone",
      })
    );
  };

  return (
    <div className="v1-signup-form">
      <div className="v1-signup-form__title-container">
        <div className="v1-signup-form__title">Sign Up</div>
        <div className="v1-signup-form__title-description">
          Lorem Ipsum is simply dummy text
        </div>
      </div>
      <div className="v1-signup-form__details-container wi-100">
        <InputField
          logo={"mail"}
          placeholder={"Email OTP"}
          type={"number"}
          value={emailOtp}
          customState={setEmailOtp}
          isChecked={otpVerificationData?.emailStatus}
        />
        {!otpVerificationData?.emailStatus && <Button1
          text={"Verify"}
          onClickFunction={() => handleEmailOtpVerify()}
          isLoading={otpVerificationData?.isLoading}
        />}

        <InputField
          logo={"call"}
          placeholder={"Mobile OTP"}
          type={"number"}
          value={mobileOtp}
          customState={setMobileOtp}
          isChecked={otpVerificationData?.phoneStatus}
        />
        {!otpVerificationData?.phoneStatus && <Button1
          text={"Verify"}
          onClickFunction={() => handleMobileOtpVerify()}
          isLoading={otpVerificationData?.isLoading}
        />}
      </div>
    </div>
  );
}

export default OtpVerificationForm;
