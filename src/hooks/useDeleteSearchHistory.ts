import { useFirestoreDelete } from './useFirestoreDelete';

export const useDeleteSearchHistory = () => {
	const { DeleteSearchHistoryEntry } = useFirestoreDelete('users');

	const deleteSearchHistory = async (userId, historyIndex) => {
		try {
			// userId와 historyIndex가 유효한지 확인
			if (userId && historyIndex >= 0) {
				console.log(userId, historyIndex);
				// 해당 사용자의 문서 ID
				const documentId = userId;

				// DeleteSearchHistoryEntry 함수를 사용하여 검색 기록 삭제
				await DeleteSearchHistoryEntry(documentId, historyIndex);
				console.log('검색 기록이 성공적으로 삭제되었습니다.');
			} else {
				console.error('유효하지 않은 userId 또는 historyIndex입니다.');
			}
		} catch (error) {
			console.error('검색 기록 삭제 중 오류 발생:', error);
		}
	};

	return { deleteSearchHistory };
};
