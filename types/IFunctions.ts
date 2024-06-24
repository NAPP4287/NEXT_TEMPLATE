// 함수 type 지정

export interface IHeadersFunc {
  "Content-type"?: string;
  accept: string;
  "Access-Control-Allow-Origin": string;
  Authorization?: string;
}
