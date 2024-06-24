// recoil
import { atom } from "recoil";
// interface
import { IAlertModalState } from "@/types/IStates";

export const alertModalState = atom<IAlertModalState>({
  key: "alertModalState",
  default: {
    isOpen: false,
    title: "",
    contents: "",
    isOne: false,
    rbtnTitle: "",
    lbtnTitle: "",
    type: "success",
    action: () => undefined,
  },
});
