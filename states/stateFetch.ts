import { atom } from "recoil";

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});

export const successState = atom<{
  msg: null | string;
  action?: Function | null;
}>({
  key: "successState",
  default: {
    msg: null,
    action: null,
  },
});
