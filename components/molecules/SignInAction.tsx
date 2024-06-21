"use client";
// react
import { useState } from "react";
// components
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SignInAction = () => {
  const [uId, setUId] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="r-flex-center h-screen mx-w-500">
      <Input
        value={uId}
        setValue={setUId}
        placeholder={"아이디를 입력해주세요."}
        inputMode={"text"}
        type={"text"}
        maxLength={undefined}
        isRound={true}
      />
      <Input
        value={pwd}
        setValue={setPwd}
        placeholder={"비밀번호를 입력해주세요."}
        inputMode={"text"}
        type={"text"}
        maxLength={undefined}
        isRound={true}
        className="my-5"
      />
      <Button
        title={"로그인"}
        isRound={true}
        bg={"black"}
        action={() => {}}
        color={"white"}
      />
    </div>
  );
};

export default SignInAction;
