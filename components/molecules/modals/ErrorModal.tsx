"use client";
import { useRouter } from "next/navigation";
// react
import { useEffect, useState } from "react";
// recoil
import { useRecoilValue, useResetRecoilState } from "recoil";
import { errorState } from "@/states/stateFetch";
// css
import styles from "@/components/molecules/modals/modal.module.css";
// components
import Button from "@/components/atoms/Button";
// data
import { DErrorStatus } from "@/data/DErrorStatus";
// cookies
import { deleteCookie } from "cookies-next";

const ErrorModal = () => {
  const router = useRouter();
  const error = useRecoilValue(errorState);
  const resetError = useResetRecoilState(errorState);

  const [render, setRender] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{
    title: string | null;
    msg: string | null;
    status: number | null;
  }>({ title: null, msg: null, status: null });

  useEffect(() => {
    if (error) {
      setRender(true);
      const statusMatch = error.match(/ERR_STATUS:(\d+)/);

      let statusCode: number | null = null;

      if (statusMatch && statusMatch[1]) {
        statusCode = parseInt(statusMatch[1], 10);
      }
      if (statusCode) {
        const errMsg = DErrorStatus[statusCode];
        setErrorInfo({
          title: errMsg.title,
          msg: errMsg.msg,
          status: statusCode,
        });
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [error, setErrorInfo]);

  const handleAction = () => {
    router.refresh();
    setErrorInfo({ title: null, msg: null, status: null });
    if (errorInfo.status === 401) {
      // 토큰 만료
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("uId");
      resetError();
      router.replace("signin");
      return;
    } else if (errorInfo.status === 403) {
      // 권한 오류
      resetError();
      router.back();
      return;
    }
    // 401이나 403 에러가 아닐 경우에는 page stay
    return resetError();
  };

  if (!error) return null;

  return (
    <div
      className={`${
        !render ? "" : error ? "animate-fadein" : "animate-fadeout"
      } ${styles.modalWrap}`}
      onClick={handleAction}
    >
      <div
        className={`${styles.modalContent} r-flex-row-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"text-red-main"}>{errorInfo.title}</div>
        <div className="text-center">{errorInfo.msg}</div>
        <div className="flex w-full">
          <Button
            title={errorInfo.status === 401 ? "로그아웃" : "닫기"}
            action={handleAction}
            color={"white"}
            bg={"gray-md"}
            isRound={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
