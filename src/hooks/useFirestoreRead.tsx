import { appFireStore } from '../firebase/config';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const useFirestoreRead = (collectionName) => {

  const ReadAllDocument = async () => {
    const querySnapshot = await getDocs(collection(appFireStore, collectionName));
    const result = querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    return result;
  }

  const ReadDocument = async ( documentName ) => {
    const docRef = doc(appFireStore, collectionName, documentName);
    const docSnapshot = await getDoc(docRef);
  
    if (docSnapshot.exists()) {
      const result = { id: docSnapshot.id, data: docSnapshot.data() };
      return result;
    } else {
      console.error('해당 문서를 찾을 수 없습니다: ', documentName);
    }
  }

  // where 사용 유형
  // where('tag', '!=', []) tag 필드 안에 (배열)값이 들어있는 것들만 가져오기
  
  const ReadField = async ( fieldName, operator, value) => {
    const q = query(collection(appFireStore, collectionName), where(fieldName, operator, value))
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    return result;
  }

  return { ReadAllDocument, ReadField, ReadDocument }
}