import { appFireStore } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export const useFirestoreUpdate = (collectionName) => {

  const token = sessionStorage.getItem('token');
  const uid = token !== null ? JSON.parse(token).userInfo.uid : null;

  const UpdateField = async (data, documentId, authorized = true) => {
    try {
      if (uid !== null) {
        const docRef = doc(appFireStore, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists() && authorized ? docSnapshot.data().userId === uid : true) {
          const updateData = {};
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              updateData[key] = data[key];
            }
          }
          await updateDoc(docRef, updateData);
          console.log('데이터가 성공적으로 수정되었습니다');
        } else {
          console.error('해당 문서를 찾을 수 없거나 권한이 없습니다');
          return false;
        }
      } else {
        console.error('UID가 없습니다');
      }
    } catch (error) {
      console.error('데이터 수정을 실패했습니다:', error);
    }
  };

  const UpdateFieldAttribute = async (
    documentId: any,
    fieldName: string,
    attributesToUpdate: any,
    elementsToUpdate: any,
    targetAttribute: string,
    newValue: any
  ) => {
    try {
      if (uid !== null) {
        const docRef = doc(appFireStore, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists() && docSnapshot.data().userId === uid) {
          const existingData = docSnapshot.data();
          const arrayField = existingData[fieldName];

          if (Array.isArray(arrayField)) {
            const elementsToUpdateArray = Array.isArray(elementsToUpdate) ? elementsToUpdate : [elementsToUpdate];

            const indexToUpdate = arrayField.findIndex(item =>
              typeof item === 'object' &&
              attributesToUpdate.every(attribute => {
                if (attribute === 'createdAt') {
                  const createdAtTimestamp = {
                    seconds: item[attribute].seconds,
                    nanoseconds: item[attribute].nanoseconds
                  };
                  return createdAtTimestamp.seconds === elementsToUpdateArray[1].seconds && createdAtTimestamp.nanoseconds === elementsToUpdateArray[1].nanoseconds;
                }
                return item[attribute] === elementsToUpdateArray[0];
              })
            );

            if (indexToUpdate !== -1) {
              const updatedItem = { ...arrayField[indexToUpdate], [targetAttribute]: newValue };
              const updatedArrayField = [...arrayField];
              updatedArrayField[indexToUpdate] = updatedItem;

              const updateData = {};
              updateData[fieldName] = updatedArrayField;

              await updateDoc(docRef, updateData);
              console.log(`'${fieldName}' 필드의 특정 객체의 '${targetAttribute}' 속성이 성공적으로 수정되었습니다.`);
            } else {
              console.error('원소를 찾을 수 없습니다.');
            }
          } else {
            console.error(`'${fieldName}'는 배열이 아닙니다.`);
          }
        } else {
          console.error('해당 문서를 찾을 수 없거나 권한이 없습니다.');
        }
      } else {
        console.error('UID가 없습니다.');
      }
    } catch (error) {
      console.error('원소 수정을 실패했습니다:', error);
    }
  };




  return { UpdateField, UpdateFieldAttribute };
};