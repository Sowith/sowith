import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export const useProfileUpdateHook = (displayName: string, photoURL: string) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const RegisterUser = async (
    displayName: string,
    userRealName: string,
    photoURL: string,
    profileMessage: string,
    email: string,
    password: string

  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    updateProfile(userCredential.user, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return{ updateProfile, RegisterUser }
};
