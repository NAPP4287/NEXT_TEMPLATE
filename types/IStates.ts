export interface IAlertModalState {
  isOpen: boolean;
  title: string;
  contents: string | React.ReactNode;
  isOne: boolean;
  type: "success" | "error" | "warning" | "text";
  rbtnTitle?: string;
  lbtnTitle: string;
  action: () => void | Function | (() => Promise<void>) | Promise<void>;
}
