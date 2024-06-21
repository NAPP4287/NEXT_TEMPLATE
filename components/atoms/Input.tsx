"use client";
//interface
import { IInputProps } from "@/types/IProps";

const Input = (props: IInputProps) => {
  const { styles, setValue, placeholder, inputMode, type, maxLength } = props;

  const handleChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <>
      {type === "textarea" ? (
        <textarea
          className="border border-gray-light p-2 w-full"
          style={{ ...styles }}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
        />
      ) : (
        <input
          className="border border-gray-light p-2 w-full"
          style={{ ...styles }}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
        />
      )}
    </>
  );
};

export default Input;
