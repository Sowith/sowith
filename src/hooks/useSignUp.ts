import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFirestoreCreate } from './useFirestoreCreate';
import { useCreateKeywords } from './useCreateKeywords';

interface UserProfileDocument {
	accountId: string;
	accountName: string;
	accountIdKeywords: string[];
	accountNameKeywords: string[];
	description: string;
	createdFolders: string[];
	followers: string[];
	following: string[];
	posts: string[];
	profileImageURL: string;
	bookmarkedFolders: string[];
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
	const { generateKeywordCombinations } = useCreateKeywords();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);
	const { CreateDocumentWithCustomID } = useFirestoreCreate('users');

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
			console.log(user);

			if (!user) {
				throw new Error('회원가입에 실패했습니다.');
			}

			const customUserDocument: UserProfileDocument = {
				accountId: myAccountID,
				accountName: myName,
				accountIdKeywords: generateKeywordCombinations(myAccountID),
				accountNameKeywords: generateKeywordCombinations(myName),
				description: '',
				createdFolders: [],
				bookmarkedFolders: [],
				followers: [],
				following: [],
				posts: [],
				profileImageURL: '',
				searchHistories: [],
			};

			CreateDocumentWithCustomID(user.uid, customUserDocument);

			await updateProfile(appAuth.currentUser, { displayName: myAccountID });

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
