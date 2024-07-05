"use client";
// react
import { useEffect, useState } from "react";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingModalState } from "@/states/stateModal";
// css
import styles from "@/components/molecules/modals/modal.module.css";
// lottie
import Lottie from "react-lottie-player";
import LoadingLottie from "@/public/lottie/loading.json";

const Loading = () => {
  const [render, setRender] = useState(false);

  const isLoading = useRecoilValue(loadingModalState);

  useEffect(() => {
    if (isLoading) {
      setRender(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <div
      className={`${
        !render ? "" : isLoading ? "animate-fadein" : "animate-fadeout"
      } ${styles.modalWrap}`}
    >
      <Lottie
        loop
        animationData={LoadingLottie}
        play
        style={{ width: 200, height: 200, margin: "0 auto" }}
      />
    </div>
  );
};

export default Loading;
