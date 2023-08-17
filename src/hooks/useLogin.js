import { useState } from "react";
import { appAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLoginHook = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const loginHook = (loginFormData) => {
    setError(null);
    setIsPending(false); 


    signInWithEmailAndPassword(appAuth, loginFormData.email, loginFormData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // 로그인 상태관리 추가할 부분
        console.log("유저", user);
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }
      })
      .catch((e) => {
        setError(e.message);
        setIsPending(false);
      });
  };
  return { error, isPending, loginHook };
};
