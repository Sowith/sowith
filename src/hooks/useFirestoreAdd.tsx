import { appFireStore, timestamp } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export const useFirestoreAdd = (collectionName) => {

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).uid : null;

  const addDocument = async (data) => {
    try {
      if (uid !== null) {
        const createdAt = timestamp.fromDate(new Date());
        data.userId = uid;
        const docRef = await addDoc(collection(appFireStore, collectionName), {...data, createdAt});
        console.log('데이터가 성공적으로 생성되었습니다:', docRef.id);
      } else {
        console.error('토큰이 존재하지 않습니다');
      }
    } catch (error) {
      console.error('데이터 생성을 실패했습니다:', error);
    }

  }
  return { addDocument };
}
