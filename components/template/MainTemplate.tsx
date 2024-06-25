// interface
import { IMainTempleteProps } from "@/types/IProps";

const MainTemplate = (props: IMainTempleteProps) => {
  const { children, title } = props;

  return (
    <div>
      로그인 이후 공통적으로 들어가는 컴포넌트를 넣어주세요
      {children}
    </div>
  );
};

export default MainTemplate;
