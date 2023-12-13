import { useState } from 'react';
import { appAuth, appFireStore } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface UserProfileDocument {
	uid: string;
	userId: string;
	userName: string;
	description: string;
	createdFolders: string[];
	bookmarkedFolders: string[];
	followers: string[];
	following: string[];
	posts: string[];
	profileImageURL: string;
	searchHistories: {
		title: string;
		relatedPost?: number;
		historyCategory: 'tag' | 'user' | 'text';
		followerCount?: number;
	}[];
}

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

	const signUpHook = async (signUpData: SignUpData) => {
		setError(null);
		setIsPending(true);
		const myEmail = signUpData.email;
		const myPassword = signUpData.password;
		const myName = signUpData.userName;
		const myAccountID = signUpData.accountID;

		try {
			const userCredential = await createUserWithEmailAndPassword(
				appAuth,
				myEmail,
				myPassword
			);
			const user = userCredential.user;

			if (!user) {
				throw new Error('회원가입에 실패했습니다.');
			}

			const customUserData = {
				displayName: myAccountID,
				userRealName: myName,
			};

			const customUserDocument: UserProfileDocument = {
				uid: user.uid,
				userId: myAccountID,
				userName: myName,
				description: '',
				createdFolders: [],
				bookmarkedFolders: [],
				followers: [],
				following: [],
				posts: [],
				profileImageURL: '',
				searchHistories: [],
			};

			const userProfileDocRef = doc(appFireStore, 'users', user.uid);
			await setDoc(userProfileDocRef, customUserDocument);

			await updateProfile(appAuth.currentUser, customUserData);

			setError(null);
			setIsPending(false);
			console.log('회원가입 및 사용자 데이터 추가가 완료되었습니다.');
		} catch (e: any) {
			setError(e.message);
			setIsPending(false);
		}
	};

	return { error, isPending, signUpHook };
};
