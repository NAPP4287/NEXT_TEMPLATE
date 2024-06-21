// props 타입 지정

export interface IInputProps {
  styles?: object;
  setValue: Function;
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url" | "textarea";
  maxLength: number | undefined;
}

export interface IObjInput {
  styles?: object;
  idx?: number;
  name: string;
  setValues: Function;
  values: { [key: string]: string } | Array<{ [key: string]: string }>;
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url" | "textarea";
  maxLength: number | undefined;
}
