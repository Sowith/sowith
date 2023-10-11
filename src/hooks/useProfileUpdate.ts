import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

interface profileUpdateData {
  displayName: string;
  userRealName: string;
  profileMessage: string;
  profileImage: string;
}

export const useProfileUpdateHook = ( ) => {
  const auth = getAuth();

  const updateProfileInfo = async ( profileUpdateData: profileUpdateData
  ) => {
    const currentUser = auth.currentUser;
    
    try {
      if (currentUser) {
        await updateProfile(currentUser, { });
        console.log("커런트유저",currentUser);
        return { success: true };
      } else {
        return { success: false, error: "사용자가 로그인하지 않았습니다." };
      }
    } catch (error) {
      return { success: false, error: "Firebase에러" };
    }
  };

  const registerUser = async (
    displayName: string,
    userRealName: string,
    photoURL: string,
    profileMessage: string,
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await updateProfileInfo(profileUpdateData);

      // 여기에서 추가적인 사용자 관련 작업을 수행할 수 있습니다.

      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: "Firebase에러" };
    }
  };

  return { updateProfileInfo, registerUser };
};
