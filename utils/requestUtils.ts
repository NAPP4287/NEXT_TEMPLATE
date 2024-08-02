// cookies
import { setCookie, getCookies } from "cookies-next";
// env
import Config from "@/config/config.export";
// interface
import { IHeadersFunc } from "@/types/IFunctions";
// refresh
import { customFetch } from "./refreshUtils";

const reqUrl = Config().baseUrl;

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidUlkIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoi6rSA66as7J6QIiwiaWF0IjoxNzE4Nzc1MzM4LCJleHAiOjE3MTg3Nzg5Mzh9.j0XzFP8o07BGwZq4UloANpj-8tl7C7SVOjTbopph96w";

const headers = (
  accessToken: string | undefined,
  contentType: string
): IHeadersFunc => {
  return contentType === ""
    ? {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: accessToken ? "Bearer " + accessToken : undefined,
      }
    : {
        "Content-type": contentType,
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: accessToken ? "Bearer " + accessToken : undefined,
      };
};

const reqObj = (
  method: string,
  accessToken: string | undefined,
  contentType: string = "application/json",
  body?: string | any
) => {
  return {
    method: method,
    headers: {
      ...headers(accessToken, contentType),
      "Cache-Control": "no-store",
    },
    cache: "no-store" as RequestCache,
    next: { revalidate: 0 },
    body: body,
  };
};

// API METHOD 함수

// GET
export const createGetRequest = async (url: string) => {
  const { accessToken } = getCookies();
  const requestUrl = `${reqUrl}/${url}`;

  const res = await customFetch(requestUrl, {
    ...reqObj("GET", testToken),
  });
  return res.json();
};

// POST
export const createPostRequest = async (
  url: string,
  body: string | { [key: string]: any },
  type?: "file"
) => {
  const { accessToken } = getCookies();
  // binary 파일로 보내야하는 경우, FormData 형식이며 이미 string 형식
  // 따라서 인자로 받는 body의 타입이 string인지 아닌지 구분 필요

  const stringBody = type === "file" ? body : JSON.stringify(body);
  const requestUrl = `${reqUrl}/${url}`;
  const contentType = type === "file" ? "" : "application/json";

  const res = await customFetch(requestUrl, {
    ...reqObj("POST", accessToken, contentType, stringBody),
  });

  return res.json();
};

// PATCH
export const createPatchRequest = async (
  url: string,
  body: { [key: string]: any }
) => {
  const { accessToken } = getCookies();
  const requestUrl = `${reqUrl}/${url}`;

  const res = await customFetch(requestUrl, {
    ...reqObj("PATCH", testToken, "application/json", JSON.stringify(body)),
  });

  return res.json();
};

// DELETE
export const createDeleteRequest = async (
  url: string,
  body: { [key: string]: any }
) => {
  const { accessToken } = getCookies();
  const requestUrl = `${reqUrl}/${url}`;

  const res = await customFetch(requestUrl, {
    ...reqObj("DELETE", testToken, "application/json", JSON.stringify(body)),
  });

  return res.json();
};
