// interface
import { DSignupInputType } from "@/types/IDatas";

export const DSignupInput: { [key: string]: DSignupInputType } = {
  ["email"]: {
    name: "이메일",
    invalidTxt: "올바르지 않은 이메일 양식입니다.",
    placeholder: "이메일을 입력해주세요.",
    require: true,
    type: "text",
    inputMode: "text",
  },
  ["uId"]: {
    name: "아이디",
    invalidTxt: "두글자 이상 입력해주세요.",
    placeholder: "아이디를 입력해주세요.",
    require: true,
    type: "text",
    inputMode: "text",
  },
  ["phone"]: {
    name: "전화번호",
    invalidTxt: "올바르지 않은 연락처 양식입니다.",
    placeholder: "010-1111-1111",
    require: true,
    type: "tel",
    inputMode: "tel",
  },
  ["pwd"]: {
    name: "비밀번호",
    invalidTxt: "8~20자리 영문, 숫자, 특수문자를 사용하여 다시 시도해주세요.",
    placeholder: "8~20자리 영문, 숫자, 특수문자 사용 가능",
    require: true,
    type: "password",
    inputMode: "text",
  },
  ["pwdChk"]: {
    name: "비밀번호 확인",
    invalidTxt: "비밀번호가 같지 않습니다.",
    placeholder: "8~20자리 영문, 숫자, 특수문자 사용 가능",
    require: true,
    type: "password",
    inputMode: "text",
  },
  ["ssr"]: {
    name: "주민등록번호",
    invalidTxt: "올바르지 않은 주민등록번호 양식이 아닙니다.",
    placeholder: "850123-1012345",
    require: true,
    type: "number",
    inputMode: "numeric",
  },
};
