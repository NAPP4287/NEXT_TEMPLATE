"use client";
// interface
import { IObjSelectProps, ColorType } from "@/types/IProps";

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

const ObjSelect = (props: IObjSelectProps) => {
  const {
    name,
    list,
    selectDisabled,
    setValues,
    values,
    placeholder,
    fontSize,
    className,
    color,
    border,
    isRound,
    idx,
  } = props;

  const borderClass = border
    ? borderClasses[border]
    : borderClasses["gray-light"];

  const colorClass =
    (Array.isArray(values) && idx !== undefined && values[idx][name] === "") ||
    (!Array.isArray(values) && values[name] === "")
      ? "text-gray-light"
      : color
      ? colorClasses[color]
      : "";
  const fontSizeClass = fontSize ? fontSize : "text-df";
  const roundClass = isRound ? "rounded-md" : "";

  const settingSelectValue = () => {
    if (Array.isArray(values) && idx !== undefined) {
      return values[idx][name];
    } else if (!Array.isArray(values)) {
      return values[name];
    }
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Array.isArray(values) && idx !== undefined) {
      // values가 배열일 때 해당 요소의 해당 키를 가진 값을 변경
      const frontArr = values.slice(0, idx);
      const backArr = values.slice(idx + 1);
      const currentValue = values[idx];

      setValues([
        ...frontArr,
        { ...currentValue, [name]: e.target.value },
        ...backArr,
      ]);
    } else {
      setValues({ ...values, [name]: e.target.value });
    }
  };

  return (
    <>
      <select
        name={name}
        onChange={handleSelectValue}
        value={settingSelectValue()}
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

export default ObjSelect;
