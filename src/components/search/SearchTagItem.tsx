import { useNavigate } from 'react-router-dom';
import { useFirestoreUpdate } from 'hooks/useFirestoreUpdate';
import getUserInfo from 'utils/getUserInfo';
import { styled } from 'styled-components';

import { arrayUnion } from 'firebase/firestore';

import formatNumber from 'utils/formatNumber';

import tagIcon from '../../assets/icon/icon-tag.svg';

export interface TagItemProps {
	tagTitle?: string;
	tagNumber?: number;
}

export const TagItem: React.FC<TagItemProps> = ({ tagTitle, tagNumber }) => {
	const userInfo = getUserInfo();
	const { UpdateField } = useFirestoreUpdate('users');
	const navigate = useNavigate();

	const handleTagClick = async () => {
		const newHistory = {
			title: tagTitle,
			historyCategory: 'tag',
			tagCount: tagNumber,
		};
		try {
			await UpdateField(
				{
					searchHistories: arrayUnion(newHistory),
				},
				userInfo,
				false
			);
			console.log('검색 기록이 업데이트되었습니다');
		} catch (error) {
			console.error('검색 기록 업데이트 실패:', error);
		}
		navigate('/searchbycategory', { state: tagTitle });
	};

	return (
		<Container onClick={handleTagClick}>
			<div className='icon-tag'>
				<img src={tagIcon} alt='' />
			</div>
			<div className='tag-info'>
				<span className='tag-title'>{tagTitle}</span>
				<span className='tag-number'>{`${formatNumber(tagNumber)}개`}</span>
			</div>
		</Container>
	);
};

const Container = styled.div`
	cursor: pointer;
	background-color: #ffffff;
	display: flex;
	margin: 10px auto;
	width: 88%;

	div.icon-tag {
		border-radius: 50%;
		border: 1px solid var(--gray200-color);
		width: 40px;
		height: 40px;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.tag-info {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	div.tag-info span {
		display: block;
	}

	span.tag-title {
		font-family: var(--font--Medium);
		font-size: 1rem;
	}

	span.tag-number {
		font-size: 0.8rem;
		color: #898989;
	}
`;
