const formatNumber = (number) => {
	if (number < 100) {
		return `${number}`;
	} else if (number < 1000) {
		return `${Math.floor(number / 100) * 100}+`;
	} else if (number < 1000000) {
		return `${Math.floor(number / 1000)}k+`;
	} else {
		const formattedOverMillion = (number / 1000000).toFixed(1); // 백만 단위 계산 및 소수점 첫 번째 자리까지 표시
		return `${
			formattedOverMillion.endsWith('.0')
				? formattedOverMillion.slice(0, -2)
				: formattedOverMillion
		}M+`; // .0 제거
	}
};

export default formatNumber;
