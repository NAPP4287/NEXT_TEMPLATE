"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
// interface
import { IClipboardProps } from "@/types/IProps";
// image
import Image from "next/image";
// css
import styles from "@/components/atoms/atoms.module.css";

const Clipboard = (props: IClipboardProps) => {
  const { title, copyTxt, img, imgPlace, action, className } = props;

  return (
    <CopyToClipboard text={copyTxt} onCopy={() => action()}>
      <div className={`${styles["clipboard-wrap"]} ${className}`}>
        {img && imgPlace === "left" && (
          <Image priority src={img} alt="btn_icon" className={"mr-2"} />
        )}
        {title}
        {img && imgPlace === "right" && (
          <Image priority src={img} alt="btn_icon" className={"ml-2"} />
        )}
      </div>
    </CopyToClipboard>
  );
};

export default Clipboard;
