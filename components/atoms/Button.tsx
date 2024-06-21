import Image from "next/image";
// interface
import { IButtonProps, ColorType } from "@/types/IProps";

const bgClasses: Record<ColorType, string> = {
  black: "bg-black",
  white: "bg-white",
  "red-main": "bg-red-main",
  "red-light": "bg-red-light",
  "red-md": "bg-red-md",
  "green-main": "bg-green-main",
  "green-light": "bg-green-light",
  "green-md": "bg-green-md",
  "gray-main": "bg-gray-main",
  "gray-light": "bg-gray-light",
  "gray-md": "bg-gray-md",
  "primary-main": "bg-blue-main",
  "primary-sub": "bg-blue-sub",
};

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

const Button = (props: IButtonProps) => {
  const {
    title,
    bg,
    fontSize,
    action,
    color,
    border,
    disabled,
    img,
    imgPlace,
    className,
    isRound,
  } = props;

  const colorClass = colorClasses[color];
  const bgClass = bgClasses[bg];
  const borderClass = border ? borderClasses[border] : "";
  const fontSizeClass = fontSize ? fontSize : "text-df";
  const roundClass = isRound ? "rounded-md" : "";

  return (
    <>
      <button
        className={`flex-center p-2 w-full ${colorClass} ${bgClass} ${borderClass} ${fontSizeClass} ${roundClass} ${
          className ? className : ""
        }`}
        onClick={(() => action()) || action}
        disabled={disabled}
      >
        {img && imgPlace === "left" && (
          <Image loading="lazy" src={img} alt="btn_icon" className={"mr-1"} />
        )}
        {title}
        {img && imgPlace === "right" && (
          <Image loading="lazy" src={img} alt="btn_icon" className={"ml-1"} />
        )}
      </button>
    </>
  );
};

export default Button;
