"use client";
// cookies
import { getCookie, setCookie, deleteCookie } from "cookies-next";
// react
import { useState, useEffect, useCallback } from "react";
// components
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
// css
import styles from "@/app/(sign)/sign.module.css";
// utils
import { chkEmptyInfo } from "@/utils/commonUtils";
// recoil
import { useSetRecoilState } from "recoil";
import { alertModalState } from "@/states/stateModal";

const SignInAction = () => {
  const [uId, setUId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSave, setIsSave] = useState<boolean>(false);

  const setAlertInfo = useSetRecoilState(alertModalState);

  const saveUId = getCookie("uId");

  const handleSingleCheck = (checked: boolean) => {
    setIsSave(checked);
  };

  const handleLogin = async () => {
    try {
      const chkEmpty = chkEmptyInfo({ uId: uId, pwd: pwd }, ["uId", "pwd"]);

      if (chkEmpty === "empty") {
        return setAlertInfo({
          isOpen: true,
          isOne: true,
          type: "error",
          title: "에러",
          contents: "빈값을 모두 채워주세요.",
          lbtnTitle: "확인",
          action: () => {},
        });
      }

      if (isSave) {
        setCookie("uId", uId);
      } else {
        deleteCookie("uId");
      }
    } catch (e) {}
  };

  const handleSetUId = useCallback(() => {
    if (saveUId !== undefined) {
      setUId(saveUId);
      setIsSave(true);
    }
  }, [saveUId]);

  useEffect(() => {
    handleSetUId();
  }, []);

  const submitEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <div className="r-flex-center h-screen mx-w-500">
      <form onKeyDown={submitEnter}>
        <Input
          value={uId}
          setValue={setUId}
          placeholder={"아이디"}
          inputMode={"text"}
          type={"text"}
          maxLength={undefined}
          isRound={true}
        />
        <Input
          value={pwd}
          setValue={setPwd}
          placeholder={"비밀번호"}
          inputMode={"text"}
          type={"password"}
          maxLength={undefined}
          isRound={true}
          className="my-5"
        />
      </form>
      <div>
        <input
          type="checkbox"
          name="saveUid"
          onChange={(e) => handleSingleCheck(e.target.checked)}
          checked={isSave}
        />
        <span>아이디 저장</span>
      </div>
      <Button
        title={"로그인"}
        isRound={true}
        bg={"black"}
        action={handleLogin}
        color={"white"}
      />
    </div>
  );
};

export default SignInAction;
