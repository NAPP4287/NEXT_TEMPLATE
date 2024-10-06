// interface
import {
  IObjStringType,
  IObjNullType,
  IObjNumberType,
  IObjUndefinedType,
} from "@/types/ICommon";

// 스크롤 맨 위로
export const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 날짜 포맷 뽑아주기 (YYYY-MM-DD)
export const handleDateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
export const chkSignupInvalidInfo = (info: { [key: string]: string }) => {
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

// 원하는 key의 value만 type 변경 해주기
export const changeTypeObj = (
  obj: { [key: string]: any },
  key: Array<string>,
  type: "string" | "number" | "undefined" | "null"
) => {
  if (type === "string") {
    const newObj: IObjStringType = {};
    for (let i in obj) {
      newObj[i] = key.includes(i) ? `${obj[i]}` : obj[i];
    }
    return newObj;
  } else if (type === "number") {
    const newObj: IObjNumberType = {};
    for (let i in obj) {
      newObj[i] = key.includes(i) ? +obj[i] : obj[i];
    }
    return newObj;
  } else if (type === "null") {
    const newObj: IObjNullType = {};
    for (let i in obj) {
      newObj[i] = key.includes(i) ? null : obj[i];
    }
    return newObj;
  } else {
    const newObj: IObjUndefinedType = {};
    for (let i in obj) {
      newObj[i] = key.includes(i) ? undefined : obj[i];
    }
    return newObj;
  }
};

export const handleTimeFormat = (time: string) => {
  const currentDate: Date = new Date();
  const givenDate: Date = new Date(time);

  const differenceInMilliseconds: number =
    currentDate.getTime() - givenDate.getTime();

  // 몇 초 전인지
  const millisecondsInOneMinute: number = 1000 * 60;
  const differenceInMinutes: number =
    differenceInMilliseconds / millisecondsInOneMinute;

  // 몇 시간 전인지
  const millisecondsInOneHour: number = 1000 * 60 * 60;
  const differenceInHours: number = Math.floor(
    differenceInMilliseconds / millisecondsInOneHour
  );

  // 몇 일 전인지
  const millisecondsInOneDay: number = 1000 * 60 * 60 * 24;
  const differenceInDays: number = Math.floor(
    differenceInMilliseconds / millisecondsInOneDay
  );

  // 방금 전
  if (differenceInMinutes === 0) {
    return "방금 전";
  } else if (differenceInMinutes >= 1 && Math.floor(differenceInMinutes) < 60) {
    // ㅇㅇ분 전
    return `${Math.floor(differenceInMinutes)}분 전`;
  } else if (differenceInHours <= 23) {
    // ㅇㅇ시간 전
    return `${differenceInHours}시간 전`;
  } else if (differenceInHours >= 24 && differenceInDays < 7) {
    // ㅇㅇ일 전
    return `${differenceInDays}일 전`;
  } else {
    // ㅇ월ㅇ일
    return handleDateFormat(givenDate);
  }
};
