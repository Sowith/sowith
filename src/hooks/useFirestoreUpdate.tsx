import { appFireStore } from '../firebase/config';
import {
	doc,
	updateDoc,
	getDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';

export const useFirestoreUpdate = (collectionName) => {
	const token = sessionStorage.getItem('token');
	const uid = token !== null ? JSON.parse(token).uid : null;

	const UpdateField = async (documentId, data) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				console.log(docSnapshot.data());

				if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
					const updateData = {};
					// data 객체에서 수정할 필드를 동적으로 확인하고 업데이트 데이터에 추가
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							updateData[key] = data[key];
						}
					}
					await updateDoc(docRef, updateData);
					console.log('데이터가 성공적으로 수정되었습니다');
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다');
				}
			} else {
				console.error('UID가 없습니다');
			}
		} catch (error) {
			console.error('데이터 수정을 실패했습니다:', error);
		}
	};

	const UpdatePublicField = async (documentId, data) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists()) {
					// 업데이트를 위한 객체 초기화
					const updateData = {};

					// data 객체를 반복하여 필요한 업데이트를 updateData 객체에 추가
					for (const key in data) {
						if (
							data.hasOwnProperty(key) &&
							(key === 'likedUsers' || key === 'bookmarkedUsers')
						) {
							const value = data[key];
							if (value.add) {
								updateData[key] = arrayUnion(uid);
							} else if (value.remove) {
								updateData[key] = arrayRemove(uid);
							}
						}
					}

					// 업데이트 데이터가 준비되면 Firestore 문서 업데이트
					if (Object.keys(updateData).length > 0) {
						await updateDoc(docRef, updateData);
						console.log('데이터가 성공적으로 수정되었습니다');
					} else {
						console.error('유효한 업데이트 데이터가 없습니다');
					}
				} else {
					console.error('해당 문서를 찾을 수 없습니다');
				}
			} else {
				console.error('UID가 없습니다');
			}
		} catch (error) {
			console.error('데이터 수정을 실패했습니다:', error);
		}
	};

	const UpdateFieldUid = async (documentId, data) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				console.log(docSnapshot.data());

				if (docSnapshot.exists() && docSnapshot.data().uid === uid) {
					const updateData = {};
					// data 객체에서 수정할 필드를 동적으로 확인하고 업데이트 데이터에 추가
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							updateData[key] = data[key];
						}
					}
					await updateDoc(docRef, updateData);
					console.log('데이터가 성공적으로 수정되었습니다');
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다');
				}
			} else {
				console.error('UID가 없습니다');
			}
		} catch (error) {
			console.error('데이터 수정을 실패했습니다:', error);
		}
	};

	return { UpdateField, UpdatePublicField, UpdateFieldUid };
};
