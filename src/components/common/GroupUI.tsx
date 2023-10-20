import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import iconYellowStar from '../../assets/icon/icon-star-yellow.svg';

export interface GroupUIProps {
	groupId: string;
	groupTitle: string;
	groupTags: string[];
	groupMember: number;
	groupImageURL: string;
}

export const GroupUI: React.FC<GroupUIProps> = ({
	groupTitle,
	groupTags,
	groupMember,
	groupImageURL,
}) => {
	const renderTags = (tags) => {
		const maxTags = tags.slice(0, 2);

		return maxTags.map((tag, index) => (
			<React.Fragment key={index}>
				{index >= 0 && <span className='tag-style'>#</span>}
				<span> {tag}</span>
			</React.Fragment>
		));
	};

	const [postTime, setPostTime] = useState(0);

	const TimeAgo = ({ postTime }) => {
		const [timeAgo, setTimeAgo] = useState('');

		useEffect(() => {
			const calculateTimeAgo = () => {
				const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
				const timeDifference = 36000 - 3000;
				// const timeDifference = currentTime - postTime;

				if (timeDifference < 60) {
					setTimeAgo('방금 전');
				} else if (timeDifference < 3600) {
					const minutesAgo = Math.floor(timeDifference / 60);
					setTimeAgo(`${minutesAgo}분`);
				} else if (timeDifference < 86400) {
					const hoursAgo = Math.floor(timeDifference / 3600);
					setTimeAgo(`${hoursAgo}시간`);
				} else {
					const daysAgo = Math.floor(timeDifference / 86400);
					setTimeAgo(`${daysAgo}일`);
				}
			};

			calculateTimeAgo();
		}, [postTime]);

		return <span>{timeAgo} 전</span>;
	};

	return (
		<GroupUIWrap>
			<ImageWrap>
				<img
					className='group-profile-img'
					src={groupImageURL}
					alt='group profile'
				/>
				<div className='group-star'>
					<img src={iconYellowStar} alt='bookmark'></img>
					<span>1.9</span>
					<span>K</span>
				</div>
			</ImageWrap>

			<ContentsWrap>
				<h3>{groupTitle}</h3>
				{renderTags(groupTags)}
				<div style={{ display: 'flex' }}>
					<UserImgWrap>
						<div className='span-wrap'>
							<span>그룹 멤버 {groupMember}명</span>
							<span>|</span>
							<span>
								<TimeAgo postTime={postTime} />
							</span>
						</div>
					</UserImgWrap>
				</div>
			</ContentsWrap>
		</GroupUIWrap>
	);
};
const GroupUIWrap = styled.article`
	width: 88%;
	margin: 0 auto;
	padding: 10px 0;
	box-sizing: border-box;
	display: flex;
`;

const ImageWrap = styled.div`
	position: relative;
	& .group-profile-img {
		max-width: 90px;
		border-radius: 10px;
	}

	& .group-star {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 2px 5px;
		border-radius: 10px;
		color: white;
		font-family: var(--font--Regular);

		position: absolute;
		bottom: 5px;
		left: 5px;

		& > img {
			width: 15px;
			margin-right: 3px;
			margin-top: 1.5px;
		}
	}
`;

const ContentsWrap = styled.div`
	padding-left: 15px;
	position: relative;
	width: 100%;

	& h3 {
		font-size: 1rem;
		letter-spacing: 1px;
		margin-bottom: 3px;
	}

	& span {
		font-size: 0.8rem;
		margin-right: 5px;
	}

	& .tag-style {
		color: var(--main-color);
		font-family: var(--font--Bold);
		margin-right: 0;
	}
`;

const UserImgWrap = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;

	.span-wrap {
		display: inline-block;
		font-size: 0.8rem;
		& span {
			margin-right: 10px;
			color: var(--gray300-color);
		}
	}
`;
