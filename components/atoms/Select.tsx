"use client";
// interface
import { ISelectProps, ColorType } from "@/types/IProps";

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

const Select = (props: ISelectProps) => {
  const {
    name,
    value,
    setValue,
    selectDisabled,
    placeholder,
    className,
    list,
    fontSize,
    color,
    border,
    isRound,
  } = props;

  const borderClass = border
    ? borderClasses[border]
    : borderClasses["gray-light"];
  const colorClass =
    value === ""
      ? "text-gray-light"
      : color
      ? colorClasses[color]
      : "text-black";
  const fontSizeClass = fontSize ? fontSize : "text-df";
  const roundClass = isRound ? "rounded-md" : "";

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <select
        name={name}
        onChange={handleSelect}
        value={value}
        className={`p-2 w-full ${borderClass} ${colorClass} ${fontSizeClass} ${roundClass} ${
          className ? className : ""
        }`}
        disabled={selectDisabled}
      >
        <option hidden>{placeholder}</option>
        {list?.map((el: { name: string; code: string }, idx: number) => (
          <option key={idx} value={el.code}>
            {el.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
