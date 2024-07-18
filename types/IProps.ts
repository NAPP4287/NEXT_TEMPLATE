import { StaticImageData } from "next/image";
import { ReactNode } from "react";

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

export interface IPaginationProps {
  pagination: {
    currentPage: number;
    totalPage: number;
  };
  setPagination: Function;
  showNum: number;
  path: string;
}

export interface ISelectProps {
  name: string;
  value: string;
  setValue: Function;
  selectDisabled: boolean;
  placeholder: string;
  isRound: boolean;
  list: Array<{ name: string; code: string }>;
  fontSize?: FontSizeType;
  color?: ColorType;
  border?: ColorType;
  className?: string;
}

export interface IObjSelectProps {
  name: string;
  list: Array<{ name: string; code: string }>;
  selectDisabled: boolean;
  setValues: Function;
  values: { [key: string]: string } | Array<{ [key: string]: string }>;
  placeholder: string;
  fontSize?: FontSizeType;
  className?: string;
  color?: ColorType;
  border?: ColorType;
  isRound: boolean;
  idx?: number;
}

export interface IDragFileProps {
  accept: string;
  descript?: ReactNode;
  className?: string;
  type: "img" | "vedio" | "doc" | "music";
  values: { fileName: string; filePath: string };
  setValues: Function;
  disabled?: boolean;
  limitImg?: {
    width: number;
    height: number;
    type: "same" | "over" | "under" | "ratio";
  };
  limitSize?: { unit: "KB" | "MB" | "GB" | "TB"; size: number };
}

export interface IMainTempleteProps {
  title: string;
  children: ReactNode;
}

export interface IFindFileProps {
  placeholder: string;
  value: { filePath: string; fileName: string };
  setValue: Function;
  className?: string;
  accept: string;
}

export interface ICheckBoxProps {
  type: "single" | "all";
  values: { [key: string]: boolean };
  setValues: Function;
  allValue: boolean;
  setAllValue: Function;
  name: string;
}

export interface IRadioProps {
  name: string;
  radioVal: string;
  value: string;
  setValue: Function;
  disabled: boolean;
  title: string;
}

export interface IEditorBoxProps {
  name: string;
  values: { [key: string]: any };
  setValues: Function;
}
