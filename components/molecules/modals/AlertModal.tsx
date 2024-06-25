"use client";
// react
import { useEffect, useCallback } from "react";
// recoil
import { useRecoilState } from "recoil";
import { alertModalState } from "@/states/stateModal";
// css
import styles from "@/components/molecules/modals/modal.module.css";
// components
import Button from "@/components/atoms/Button";

const AlertModal = () => {
  const [alertInfo, setAlertInfo] = useRecoilState(alertModalState);
  const { isOpen, isOne, title, type, contents, rbtnTitle, lbtnTitle, action } =
    alertInfo;
  const colorClass =
    type === "success"
      ? "text-green-main"
      : type === "error"
      ? "text-red-main"
      : type === "warning"
      ? "text-primary-main"
      : "text-gray-md";

  const closeModal = useCallback(() => {
    if (isOne && action) {
      action();
    }
    setAlertInfo((prevInfo) => ({ ...prevInfo, isOpen: false }));
  }, [isOne, action, setAlertInfo]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`${isOpen ? "animate-fadein" : "animate-fadeout"} ${
        styles.modalWrap
      }`}
      onClick={closeModal}
    >
      <div
        className={`${styles.modalContent} r-flex-row-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${colorClass}`}>{title}</div>
        <div>{contents}</div>
        <div className="flex w-full">
          <Button
            title={lbtnTitle}
            action={closeModal}
            color={"white"}
            bg={"gray-md"}
            isRound={true}
          />
          {!isOne && (
            <Button
              title={rbtnTitle}
              action={action}
              bg={"gray-light"}
              color={"white"}
              isRound={true}
              className="ml-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
