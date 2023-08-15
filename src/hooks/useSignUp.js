import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignUpHook = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUpHook = (sighUpData) => {
    setError(null);
    setIsPending(true); // 통신
    const myEmail = sighUpData.email;
    const myPassword = sighUpData.password;
    console.log("훅이메일:", myEmail, "훅페스워드:", myPassword);
    createUserWithEmailAndPassword(appAuth, myEmail, myPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("유저", user);
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }

        updateProfile(appAuth.currentUser)
          .then(() => {
            setError(null);
            setIsPending(false);
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
