// props 타입 지정

export interface IInputProps {
  styles: object;
  value: string;
  setValue: Function;
  placeholder: string;
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
  type: "email" | "number" | "password" | "tel" | "text" | "url" | "textarea";
}
