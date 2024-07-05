"use client";
// css
import styles from "@/components/atoms/atoms.module.css";
// interface
import { IRadioProps } from "@/types/IProps";

const Radio = (props: IRadioProps) => {
  const { name, radioVal, value, setValue, disabled, title } = props;

  const handleChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={`${styles["radio-wrap"]} flex-center`}>
      <input
        id={name}
        type="radio"
        name={name}
        value={radioVal || ""}
        onChange={(e) => handleChk(e)}
        checked={radioVal === value}
        disabled={disabled}
        className={`${styles["custom-radio"]} ${
          radioVal === value ? "ring-1 ring-primary-main bg-primary-main" : ""
        }`}
      />
      <p>{title}</p>
    </div>
  );
};

export default Radio;
