import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth";

export const useImageUpload = () => {
  const imagesUpload = async (pathToSave, selectedFile, filterValue = "") => {
    return new Promise(async (resolve, reject) => {
      const fileRef = ref(storage, `${pathToSave}/${uuidv4()}`);
      const img = new Image();
      img.src = selectedFile;

      // 이미지 로드 완료 이벤트
      img.onload = async () => {
        // Canvas를 생성하여 이미지를 그립니다.
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 필터 적용
          ctx.filter = filterValue;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Canvas에서 이미지 데이터를 얻어내고 Blob으로 변환합니다.
          canvas.toBlob(async (blob) => {
            if (blob) {
              try {
                // 수정된 이미지를 Firebase Storage에 업로드합니다.
                await uploadBytes(fileRef, blob);

                // 업로드 후 이미지의 다운로드 URL을 가져옵니다.
                const downloadURL = await getDownloadURL(fileRef);
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            } else {
              reject(new Error("Blob conversion failed"));
            }
          });
        }
      };
    });
  };

  return { imagesUpload };
};
