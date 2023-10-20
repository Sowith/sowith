export const generateKeywordCombinations = (inputString: string): string[] => {
	const inputArray: string[] = inputString.split('');
	const combinations: string[] = [];

	for (let i = 0; i < inputArray.length; i++) {
		let substring: string = '';
		for (let j = i; j < inputArray.length; j++) {
			substring += inputArray[j];
			combinations.push(substring);
		}
	}

	const filteredKeywordCombinations: string[] = combinations.filter(
		(item: string) => !/\s/.test(item)
	);

	return filteredKeywordCombinations;
};
