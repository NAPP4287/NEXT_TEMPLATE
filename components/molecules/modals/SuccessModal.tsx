"use client";
// react
import { useEffect, useState } from "react";
// recoil
import { useRecoilValue, useResetRecoilState } from "recoil";
import { successState } from "@/states/stateFetch";
// css
import styles from "@/components/molecules/modals/modal.module.css";
// components
import Button from "@/components/atoms/Button";

const SuccessModal = () => {
  const { msg, action } = useRecoilValue(successState);
  const resetSuccess = useResetRecoilState(successState);

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (msg) {
      setRender(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [msg]);

  const handleAction = () => {
    if (action) {
      action();
    }
    resetSuccess();
  };

  if (!msg) return null;

  return (
    <div
      className={`${
        !render ? "" : msg ? "animate-fadein" : "animate-fadeout"
      } ${styles.modalWrap}`}
      onClick={handleAction}
    >
      <div
        className={`${styles.modalContent} r-flex-row-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"text-green-main"}>성공</div>
        <div className="text-center">{msg}</div>
        <div className="flex w-full">
          <Button
            title={"닫기"}
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

export default SuccessModal;
