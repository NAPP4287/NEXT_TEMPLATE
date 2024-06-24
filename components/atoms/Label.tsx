"use client";
// interface
import { ILabelProps } from "@/types/IProps";

const Label = (props: ILabelProps) => {
  const { title, isRequire, className } = props;

  return (
    <label className={`w-full text-left block ${className ? className : ""}`}>
      {title}
      {isRequire && <span className="text-red-md">*</span>}
    </label>
  );
};

export default Label;
