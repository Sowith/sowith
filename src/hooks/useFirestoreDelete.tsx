import { appFireStore } from '../firebase/config';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import getUserInfo from 'utils/getUserInfo';

export const useFirestoreDelete = (collectionName) => {

	const uid = getUserInfo();

	const DeleteDocument = async (documentId) => {
		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
					// 문서 삭제
					await deleteDoc(docRef);
					console.log('데이터가 성공적으로 삭제되었습니다');
					return true
				} else {
					console.error('해당 문서를 찾을 수 없거나 권한이 없습니다');
					return false
				}
			} else {
				console.error('UID가 없습니다');
			}
		} catch (error) {
			console.error('데이터 삭제를 실패했습니다:', error);
		}
	};

	const DeleteField = async (
		documentId: string,
		fieldName: string,
		elementsToDelete: any = [],
		attributesToDelete: any = []
	) => {

		try {
			if (uid !== null) {
				const docRef = doc(appFireStore, collectionName, documentId);
				const docSnapshot = await getDoc(docRef);

				if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
					const existingData = docSnapshot.data();
					const arrayField = existingData[fieldName];

					if (Array.isArray(arrayField)) {
						const elementsToDeleteArray = Array.isArray(elementsToDelete) ? elementsToDelete : [elementsToDelete];

						const newArrayField = arrayField.filter(item => {
							if (typeof item === 'object') {
								return !attributesToDelete.every((attribute, index) => {
									if (attribute === 'createdAt') {
										const createdAtTimestamp = {
											seconds: item[attribute].seconds,
											nanoseconds: item[attribute].nanoseconds
										};
										return createdAtTimestamp.seconds === (elementsToDeleteArray[index] as any).seconds && createdAtTimestamp.nanoseconds === (elementsToDeleteArray[index] as any).nanoseconds;
									}
									return item[attribute] === elementsToDeleteArray[index];
								});
							}
							return !elementsToDeleteArray.includes(item);
						});

						const updateData = {};
						updateData[fieldName] = newArrayField;

						await updateDoc(docRef, updateData);
						console.log(`필드 '${fieldName}'의 일부 원소가 성공적으로 삭제되었습니다`);

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
	}


	return { DeleteDocument, DeleteField };
};


