"use clinet";
// css
import styles from "@/components/atoms/atoms.module.css";
// interface
import { IFindFileProps } from "@/types/IProps";
import { ChangeEvent } from "react";

const FindFile = (props: IFindFileProps) => {
  const { placeholder, value, setValue, className, accept } = props;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      filePath: e.target?.files?.[0],
      fileName: e.target?.files?.[0].name,
    });
  };

  return (
    <div className={`${styles["filebox"]}`}>
      <input
        className={`${styles["upload-name"]} ${className}`}
        placeholder={placeholder}
        value={value.fileName}
        readOnly
      ></input>
      <input
        type="file"
        id="input-file"
        onChange={(e) => handleFile(e)}
        accept={accept}
      />
      <div className="mb-sm">
        <label htmlFor="input-file" className={`${styles["file-button"]}`}>
          파일찾기
        </label>
      </div>
    </div>
  );
};

export default FindFile;
