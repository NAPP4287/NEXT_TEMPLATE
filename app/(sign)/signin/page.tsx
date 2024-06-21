import { createGetRequest, createPostRequest } from "@/utils/requestUtils";
// cookies
import { setCookie } from "cookies-next";
// components
import SignInAction from "@/components/molecules/SignInAction";

const SignIn = async () => {
  return (
    <>
      <SignInAction />
    </>
  );
};

export default SignIn;
