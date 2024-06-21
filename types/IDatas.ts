export interface DSignupInputType {
  name: string;
  invalidTxt: string;
  placeholder: string;
  require: boolean;
  type: "email" | "number" | "password" | "tel" | "text" | "url";
  inputMode: "none" | "text" | "decimal" | "numeric" | "tel";
}
