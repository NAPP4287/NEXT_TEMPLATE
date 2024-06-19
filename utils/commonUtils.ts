// interface
import { IChkSignupInvalidInfoParam } from "@/types/IParameter";

// 스크롤 맨 위로
export const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 날짜 포맷 뽑아주기 (YYYY-MM-DD)
export const handleDateFormat = (date: Date) => {};

// 주민등록번호, 핸드폰번호 자동 하이픈 생성
export const autoHypen = (value: string, name: string) => {
  if (name === "ssr") {
    return value
      .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
      .replace(/-{1,2}$/g, "");
  } else if (name === "phone") {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  }
};

// 숫자 3자리씩 ,
export const handleCountTil = (val: string | number) => {
  if (val !== undefined)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 회원가입 유효성 검사
export const chkSignupInvalidInfo = (info: IChkSignupInvalidInfoParam) => {
  const keysArr = Object.keys(info);
  const valuesArr = Object.values(info);

  const invalidArr = [];

  for (let i = 0; i < keysArr.length; i++) {
    const key: string = keysArr[i];
    const value: any = valuesArr[i];

    if (key === "ssr") {
      // 주민등록번호
      if (value !== "") !/^\d{6}[-]?\d{7}$/.test(value) && invalidArr.push(key);
    } else if (key === "email") {
      // 이메일
      if (value !== "")
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) &&
          invalidArr.push(key);
    } else if (key === "uId") {
      // 아이디
      if (value !== "")
        !/^[a-zA-Z0-9!_-]{3,20}$/.test(value) && invalidArr.push(key);
    } else if (key === "pwd") {
      // 비밀번호
      if (value !== "")
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
          value
        ) && invalidArr.push(key);
    } else if (key === "pwd_chk") {
      if (value !== "") value !== info.pwd && invalidArr.push(key);
    } else if (key === "phone") {
      // 핸드폰 번호
      if (value !== "")
        !/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(value) &&
          invalidArr.push(key);
    } else if (key === "name") {
      if (value !== "") value.length < 2 && invalidArr.push(key);
    }
  }

  return invalidArr;
};

// 빈값 검사
export const chkEmptyInfo = (
  info: { [key: string]: string | undefined },
  requireList: Array<string>
) => {
  let requireValues: { [key: string]: string | undefined } = {};

  for (let i in info) {
    if (requireList.includes(i)) {
      requireValues[i] = info[i];
    }
  }

  const valuesArr = Object.values(requireValues);

  for (let i = 0; i < valuesArr.length; i++) {
    const value: any = valuesArr[i];

    if (value === undefined) {
      return "empty";
    }
    if (value.length === 0) {
      return "empty";
    }
  }

  return "go";
};
