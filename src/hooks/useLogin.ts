import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword, AuthError, UserCredential } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import loginToken from "recoil/loginToken";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginHookResult {
  error: string | null;
  isPending: boolean;
  loginHook: (loginFormData: LoginFormData) => void;
}

export const useLoginHook = (): LoginHookResult => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const setUid = useSetRecoilState(loginToken);
  
  const loginHook = (loginFormData: LoginFormData) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(appAuth, loginFormData.email, loginFormData.password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log("유저", user);
        setUid(user.uid)
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }
      })
      .catch((e: AuthError) => {
        setError(e.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return { error, isPending, loginHook };
};
