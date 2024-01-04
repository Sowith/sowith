import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
	// 환경 변수 REACT_APP_KAKAO_KEY가 정의되지 않았을 경우 오류 발생
	if (process.env.REACT_APP_KAKAO_KEY === undefined) {
		throw new Error('Kakao API key is undefined');
	}

	useKakaoLoaderOrigin({
		appkey: process.env.REACT_APP_KAKAO_KEY,
		libraries: ['clusterer', 'drawing', 'services'],
	});
}
