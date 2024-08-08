// interface
import { IObjInputProps, ColorType } from "@/types/IProps";

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

const ObjInput = (props: IObjInputProps) => {
  const {
    idx,
    name,
    setValues,
    values,
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

  const settingInputValue = () => {
    if (Array.isArray(values) && idx !== undefined) {
      return values[idx][name];
    } else if (!Array.isArray(values)) {
      return values[name];
    }
  };

  const handleChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (type === "number" && maxLength !== undefined) {
      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
    }
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
      {type === "textarea" ? (
        <textarea
          className={`p-2 w-full ${borderClass} ${colorClass} ${fontSizeClass} ${roundClass} ${
            className ? className : ""
          }`}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          disabled={disabled}
          value={settingInputValue()}
        />
      ) : (
        <input
          className={`p-2 w-full ${borderClass} ${colorClass} ${fontSizeClass} ${roundClass} ${
            className ? className : ""
          }`}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
          disabled={disabled}
          value={settingInputValue()}
          pattern={type === "number" ? "[0-9]*" : undefined}
          onWheel={(event) => (event.target as HTMLElement).blur()}
          autoComplete="off"
        />
      )}
    </>
  );
};

export default ObjInput;
