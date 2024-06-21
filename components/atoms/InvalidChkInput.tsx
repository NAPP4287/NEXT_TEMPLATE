"use client";
// react
import { useEffect, useState } from "react";
// interface
import { IInvaildChkInputProps } from "@/types/IProps";
// utils
import { chkSignupInvalidInfo, autoHypen } from "@/utils/commonUtils";

const InvaildChkInput = (props: IInvaildChkInputProps) => {
  const {
    isRound,
    disabled,
    name,
    values,
    setValues,
    inputMode,
    placeholder,
    type,
    maxLength,
    invalidTxt,
  } = props;

  const roundClass = isRound ? "rounded-md" : "";
  const [invalidTxtArr, setInvalidTxtArr] = useState<Array<string>>([]);

  const handleChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let changeValue: string | undefined = e.target.value;

    if (name === "ssr" || name === "phone") {
      changeValue = autoHypen(e.target.value, name);
    }
    setValues({ ...values, [name]: changeValue });
  };

  useEffect(() => {
    setInvalidTxtArr([...chkSignupInvalidInfo(values)]);
  }, [values]);

  return (
    <form className="w-full mb-5">
      <input
        className={`p-2 w-full border border-gray-light ${roundClass}`}
        maxLength={maxLength}
        onChange={handleChangeValue}
        placeholder={placeholder}
        inputMode={inputMode}
        type={type}
        disabled={disabled}
        value={values[name] || ""}
        autoComplete={"off"}
        pattern={type === "number" ? "[0-9]*" : undefined}
        onWheel={(event) => (event.target as HTMLElement).blur()}
      />
      {invalidTxtArr.includes(name) && (
        <span className="text-md ml-1 text-red-main">{invalidTxt}</span>
      )}
    </form>
  );
};

export default InvaildChkInput;
