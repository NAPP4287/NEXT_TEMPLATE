"use client";
// react
import { useState } from "react";
// components
import InvaildChkInput from "@/components/atoms/InvalidChkInput";
import Label from "@/components/atoms/Label";
import Button from "@/components/atoms/Button";
// data
import { DSignupInput } from "@/data/DInput";

const SignUpRegister = () => {
  const [invalidChkInfo, setInvalidChkInfo] = useState({
    email: "",
    uId: "",
    phone: "",
    pwd: "",
    pwdChk: "",
    ssr: "",
  });

  return (
    <div className="r-flex-center h-screen mx-w-500">
      {Object.keys(DSignupInput).map((el: string) => (
        <div className="w-full" key={el}>
          <Label
            title={DSignupInput[el].name}
            isRequire={DSignupInput[el].require}
            className="mb-1"
          />
          <InvaildChkInput
            isRound={true}
            name={el}
            setValues={setInvalidChkInfo}
            values={invalidChkInfo}
            placeholder={DSignupInput[el].placeholder}
            inputMode={DSignupInput[el].inputMode}
            type={DSignupInput[el].type}
            maxLength={undefined}
            invalidTxt={DSignupInput[el].invalidTxt}
          />
        </div>
      ))}
      <Button
        title={"회원가입"}
        bg={"black"}
        color={"white"}
        action={() => console.log("회원가입 함수를 넣어주세요.")}
        isRound={true}
        className="mt-5"
      />
    </div>
  );
};

export default SignUpRegister;
