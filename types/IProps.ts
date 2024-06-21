import { StaticImageData } from "next/image";

// props 타입 지정

export type ColorType =
  | "black"
  | "white"
  | "red-main"
  | "red-light"
  | "red-md"
  | "green-main"
  | "green-light"
  | "green-md"
  | "gray-main"
  | "gray-light"
  | "gray-md"
  | "primary-main"
  | "primary-sub";

type FontSizeType = "text-sm" | "text-md" | "text-df" | "text-lg" | "text-xlg";

export interface IInputProps {
  fontSize?: FontSizeType;
  className?: string;
  color?: ColorType;
  border?: ColorType;
  isRound: boolean;
  disabled?: boolean;
  setValue: Function;
  value: string;
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url" | "textarea";
  maxLength: number | undefined;
}

export interface IObjInputProps {
  fontSize?: FontSizeType;
  className?: string;
  color?: ColorType;
  border?: ColorType;
  isRound: boolean;
  disabled?: boolean;
  idx?: number;
  name: string;
  setValues: Function;
  values: { [key: string]: string } | Array<{ [key: string]: string }>;
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url" | "textarea";
  maxLength: number | undefined;
}

export interface IInvaildChkInputProps {
  isRound: boolean;
  disabled?: boolean;
  name: string;
  setValues: Function;
  values: { [key: string]: string };
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url";
  maxLength: number | undefined;
  invalidTxt: string;
}

export interface IButtonProps {
  title: string | undefined;
  bg: ColorType;
  color: ColorType;
  fontSize?: FontSizeType;
  action: (() => void) | (() => Promise<void>) | (() => string) | Function;
  border?: ColorType;
  disabled?: boolean;
  isRound: boolean;
  img?: StaticImageData;
  imgPlace?: "left" | "right";
  className?: string;
}

export interface ILabelProps {
  title: string;
  isRequire: boolean;
  className?: string;
}
