import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword, AuthError, UserCredential } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import loginToken from "recoil/loginToken";
import { useFirestoreRead } from "./useFirestoreRead";

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
  const { ReadDocument } = useFirestoreRead('users');

  const loginHook = (loginFormData: LoginFormData) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(appAuth, loginFormData.email, loginFormData.password)
      .then(async (userCredential: UserCredential) => { 
        const user = userCredential.user;
        console.log("유저", user);

        if (user) {
          const response = await ReadDocument(user.uid); 
          if (response && 'data' in response) { 
            setUid({
              uid: user.uid,
              accountId: response.data.accountId,
              accountName: response.data.accountName,
              profileImageURL: response.data.profileImageURL,
            });
          } else {
            throw new Error("응답에 문제가 있습니다.");
          }
        } else {
          throw new Error("로그인에 실패했습니다.");
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
