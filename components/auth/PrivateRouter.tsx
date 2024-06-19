import { NextPage } from "next";
import { getCookies } from "cookies-next";

const WithAuth = (Component: NextPage | React.FC) => {
  const Auth = () => {
    const { accessToken } = getCookies();

    if (accessToken === "" || accessToken === undefined) {
      return <>login page</>;
    }
    return <Component />;
  };

  return Auth;
};

export default WithAuth;
