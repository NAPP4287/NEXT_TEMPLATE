export const DErrorStatus: { [key: number]: { title: string; msg: string } } = {
  401: {
    title: "로그인 만료",
    msg: "로그인이 만료되었습니다. 다시 로그인 해주세요.",
  },
  403: {
    title: "권한 제한",
    msg: "해당 페이지에 접근할 수 있는 권한이 없습니다.",
  },
  404: { title: "찾을 수 없음", msg: "요청하신 정보를 찾을 수 없습니다." },
  500: { title: "서버 오류", msg: "서버에서 예기치 않은 오류가 발생했습니다." },
};
