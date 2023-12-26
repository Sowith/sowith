export const useCreateKeywords = () => {
	const generateKeywordCombinations = (inputString: string): string[] => {
		const inputArray: string[] = inputString.split(''); // 문자열을 한 글자씩 배열에 저장
		const combinations: string[] = []; // 초기 배열을 빈 배열로 설정

		for (let i = 0; i < inputArray.length; i++) {
			let substring: string = '';
			for (let j = i; j < inputArray.length; j++) {
				substring += inputArray[j];
				if (substring.trim() !== '' && !substring.startsWith(' ')) {
					// 부분 문자열이 공백이 아니고, 첫 글자가 공백이 아닌 경우에만 추가
					combinations.push(substring);
				}
			}
		}
	
		return combinations;
	};

	return { generateKeywordCombinations }
}
