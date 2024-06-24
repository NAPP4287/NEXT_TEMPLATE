// env
import Config from "@/config/config.export";
// cookies
import { setCookie, getCookie } from "cookies-next";
// interface
import { IHeadersFunc } from "@/types/IFunctions";

const headers = (
  accessToken: string | undefined,
  contentType: string
): IHeadersFunc => {
  return {
    "Content-type": contentType,
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: accessToken ? "Bearer " + accessToken : undefined,
  };
};

// 모든 API 통신 interceptor
const fetchInterceptor = (
  fetch: {
    (
      input: URL | RequestInfo,
      init?: RequestInit | undefined
    ): Promise<Response>;
    (
      input: string | URL | Request,
      init?: RequestInit | undefined
    ): Promise<Response>;
  },
  refreshTokenFn: { (): Promise<any>; (): any }
) => {
  return new Proxy(fetch, {
    apply: async (target, thisArg, args) => {
      const [url, options] = args;
      try {
        let response = await target(url, options);
        // fetch("백엔드 API /notice/list", {headers: "application/json"})

        if (response.status === 401) {
          // accessToken 만료
          const newAccessToken = await refreshTokenFn();
          options.headers["Authorization"] = `Bearer ${newAccessToken}`;
          setCookie("accessToken", newAccessToken);
          // 새로운 토큰으로 함수 실행
          response = await target(url, options);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

// refresh token 함수
const refreshTokenFn = async () => {
  const refreshToken = getCookie("refreshToken");
  const accessToken = getCookie("accessToken");

  // 변경지점 (refreshResponse의 Config().baseUrl 후 url 변경 해주세요.)
  const refreshResponse = await fetch(
    `${Config().baseUrl}/admin/user/access-by-refresh`,
    {
      method: "POST",
      headers: { ...headers(accessToken, "application/json") },
      body: JSON.stringify({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidUlkIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoi6rSA66as7J6QIiwiaWF0IjoxNzE4Nzc1MzM4LCJleHAiOjE3MjEzNjczMzh9.52BSnOm_KKPAkOE49H9HI_b6i5muGCs6s89tTDctGdc",
      }),
    }
  );

  if (!refreshResponse.ok) {
    // refreshToken도 만료
    // 강제 로그아웃 필수
    throw new Error("LOGOUT");
  }

  const data = await refreshResponse.json();
  const newAccessToken = data.result.accessToken.value;

  return newAccessToken;
};

export const customFetch = fetchInterceptor(fetch, refreshTokenFn);
