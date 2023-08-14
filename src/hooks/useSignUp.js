import { useState } from "react";
import { appAuth } from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth"

export const useSigup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const singup = (email, password, nickName) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(appAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)

      if(!user){
        throw new Error('회원가입에 실패했습니다.')
      }
    }).catch((e) => {
      setError(e.message);
      setIsPending(false);
    })
  }
}