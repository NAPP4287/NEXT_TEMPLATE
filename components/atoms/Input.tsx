"use client";
//interface
import { IInputProps, ColorType } from "@/types/IProps";

const colorClasses: Record<ColorType, string> = {
  black: "text-black",
  white: "text-white",
  "red-main": "text-red-main",
  "red-light": "text-red-light",
  "red-md": "text-red-md",
  "green-main": "text-green-main",
  "green-light": "text-green-light",
  "green-md": "text-green-md",
  "gray-main": "text-gray-main",
  "gray-light": "text-gray-light",
  "gray-md": "text-gray-md",
  "primary-main": "text-blue-main",
  "primary-sub": "text-blue-sub",
};

const borderClasses: Record<ColorType, string> = {
  black: "border border-black",
  white: "border border-white",
  "red-main": "border border-red-main",
  "red-light": "border border-red-light",
  "red-md": "border border-red-md",
  "green-main": "border border-green-main",
  "green-light": "border border-green-light",
  "green-md": "border border-green-md",
  "gray-main": "border border-gray-main",
  "gray-light": "border border-gray-light",
  "gray-md": "border border-gray-md",
  "primary-main": "border border-blue-main",
  "primary-sub": "border border-blue-sub",
};

const Input = (props: IInputProps) => {
  const {
    setValue,
    value,
    placeholder,
    inputMode,
    type,
    maxLength,
    fontSize,
    className,
    color,
    border,
    isRound,
    disabled,
  } = props;

  const borderClass = border
    ? borderClasses[border]
    : borderClasses["gray-light"];
  const colorClass = color ? colorClasses[color] : "";
  const fontSizeClass = fontSize ? fontSize : "text-df";
  const roundClass = isRound ? "rounded-md" : "";

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
          className={`p-2 w-full ${borderClass} ${colorClass} ${fontSizeClass} ${roundClass} ${
            className ? className : ""
          }`}
          value={value}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          disabled={disabled}
        />
      ) : (
        <input
          className={`p-2 w-full ${borderClass} ${colorClass} ${fontSizeClass} ${roundClass} ${
            className ? className : ""
          }`}
          value={value}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default Input;
