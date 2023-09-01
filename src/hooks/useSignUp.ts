import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

interface SignUpData {
  email: string;
  password: string;
  userName: string;
  accountID: string;
}

interface SignUpHook {
  error: string | null;
  isPending: boolean;
  signUpHook: (signUpData: SignUpData) => void;
}

export const useSignUpHook = (): SignUpHook => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const signUpHook = (signUpData: SignUpData) => {
    setError(null);
    setIsPending(true);
    const myEmail = signUpData.email;
    const myPassword = signUpData.password;
    const myName = signUpData.userName;
    const myAccountID = signUpData.accountID;

    createUserWithEmailAndPassword(appAuth, myEmail, myPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }

        const customUserData = {
          displayName: myAccountID,
          userRealName: myName,
        };

        updateProfile(appAuth.currentUser, customUserData)
          .then(() => {
            setError(null);
            setIsPending(false);
            console.log("customUserData", customUserData);
          })
          .catch((e) => {
            setError(e.message);
            setIsPending(false);
          });
      })
      .catch((e) => {
        setError(e.message);
        setIsPending(false);
      });
  };

  return { error, isPending, signUpHook };
};
