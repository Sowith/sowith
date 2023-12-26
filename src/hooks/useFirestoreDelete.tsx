import { appFireStore } from '../firebase/config';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

export const useFirestoreDelete = (collectionName) => {
	const token = sessionStorage.getItem('token');
	const uid = token !== null ? JSON.parse(token).uid : null;

	const DeleteDocument = async (documentId) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
					// 문서 삭제
					await deleteDoc(docRef);
					console.log('데이터가 성공적으로 삭제되었습니다');
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다');
				}
			} else {
				console.error('UID가 없습니다');
			}
		} catch (error) {
			console.error('데이터 삭제를 실패했습니다:', error);
		}
	};

	const DeleteField = async (documentId, fieldName, elementToDelete = '') => {
		console.log(documentId, fieldName, elementToDelete);
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
					const existingData = docSnapshot.data();
					const arrayField = existingData[fieldName];

					if (Array.isArray(arrayField)) {
						if (arrayField.includes(elementToDelete)) {
							const newArrayField = arrayField.filter(
								(item) => item !== elementToDelete
							);

							const updateData = {};
							updateData[fieldName] = newArrayField;

							await updateDoc(docRef, updateData);
							console.log(
								`필드 '${fieldName}'의 '${elementToDelete}' 원소가 성공적으로 삭제되었습니다`
							);
						} else {
							console.error(
								`필드 '${fieldName}'에 '${elementToDelete}' 원소가 존재하지 않습니다.`
							);
						}
					} else {
						const updateData = {};
						updateData[fieldName] = null;

						await updateDoc(docRef, updateData);
						console.log(`필드 '${fieldName}'가 성공적으로 삭제되었습니다`);
					}
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다.');
				}
			} else {
				console.error('UID가 없습니다.');
			}
		} catch (error) {
			console.error('원소 삭제를 실패했습니다:', error);
		}
	};

	const DeleteSearchHistoryEntry = async (documentId, searchHistoryIndex) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);
				if (docSnapshot.exists() && docSnapshot.data().uid === uid) {
					const existingData = docSnapshot.data();
					const searchHistories = existingData.searchHistories || [];

					if (searchHistories.length > searchHistoryIndex) {
						// 지정된 검색 기록 항목 삭제
						searchHistories.splice(searchHistoryIndex, 1);

						// 수정된 searchHistories 배열로 문서 업데이트
						await updateDoc(docRef, { searchHistories });
						console.log('검색 기록이 성공적으로 삭제되었습니다');
					} else {
						console.error('검색 기록을 찾을 수 없습니다');
					}
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다.');
				}
			} else {
				console.error('UID가 없습니다.');
			}
		} catch (error) {
			console.error('검색 기록 삭제를 실패했습니다:', error);
		}
	};

	return { DeleteDocument, DeleteField, DeleteSearchHistoryEntry };
};
