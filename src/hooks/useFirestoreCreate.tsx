import { appFireStore, timestamp } from '../firebase/config';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';

export const useFirestoreCreate = (collectionName) => {
	const token = sessionStorage.getItem('token');
	const uid = token !== null ? JSON.parse(token).uid : null;

	const CreateDocument = async (data) => {
		try {
			if (uid !== null) {
				const createdAt = timestamp.fromDate(new Date());
				data.userId = uid;
				const docRef = await addDoc(collection(appFireStore, collectionName), {
					...data,
					createdAt,
				});
				console.log('데이터가 성공적으로 생성되었습니다:', docRef.id);
			} else {
				console.error('토큰이 존재하지 않습니다');
			}
		} catch (error) {
			console.error('데이터 생성을 실패했습니다:', error);
		}
	};

	const CreateDocumentWithCustomID = async (documentId, data) => {
		try {
			const documentRef = doc(appFireStore, collectionName, documentId);
			await setDoc(documentRef, { ...data });

			console.log('데이터가 성공적으로 생성되었습니다: ', documentId);
		} catch (error) {
			console.error('데이터 생성에 실패했습니다: ', error);
		}
	};

	const CreateDocumentManual = async (data, docName) => {
		try {
			if (uid !== null) {
				const createdAt = timestamp.fromDate(new Date());
				data.userId = uid;
				const docRef = doc(appFireStore, collectionName, docName);
				await setDoc(docRef, { ...data, createdAt });
				console.log('데이터가 성공적으로 생성되었습니다:', docRef.id);
			} else {
				console.error('토큰이 존재하지 않습니다');
			}
		} catch (error) {
			console.error('데이터 생성을 실패했습니다:', error);
		}
	};

	return { CreateDocument, CreateDocumentWithCustomID, CreateDocumentManual };
};
