import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { GroupUI, GroupUIProps } from '../../common/GroupUI';

import arrowNext from '../../../assets/icon/icon-arrow-next.svg';
import sowithHeart from '../../../assets/icon/icon-sowith-heart.svg';

export const ProfileBottomGroup = () => {
	const [isGroupUI, setIsGroupUI] = useState(true);
	const [archiveFollowingGroupData, setArchiveFollowingGroupData] = useState<
		GroupUIProps[]
	>([]);
	const [archiveActiveGroupData, setArchiveActiveGroupData] = useState<
		GroupUIProps[]
	>([]);

	const navigate = useNavigate();
	const openDetail = (currentStepValue) => {
		navigate(`/profiledetailPage/${currentStepValue}`);
	};
	const token = sessionStorage.getItem('token');
	const uid = token !== null ? JSON.parse(token).uid : null;

	const fireStoreUserReader = useFirestoreRead('users');
	const fireStoreGroupReader = useFirestoreRead('groups');

	useEffect(() => {
		const fetchUserGroups = async () => {
			if (uid) {
				try {
					// uid에 해당하는 document 가져오기
					const response = await fireStoreUserReader.ReadDocument(uid);
					const followingGroupsData = response?.data?.groups?.followingGroups;
					const activeGroupsData = response?.data.groups?.activeGroups;

					const response2 = await fireStoreGroupReader.ReadAllDocument();
					const matchedFollowingGroups = response2.filter((group) =>
						followingGroupsData.includes(group.id)
					);
					const matchedActiveGroups = response2.filter((group) =>
						activeGroupsData.includes(group.id)
					);

					const followingGroupData: GroupUIProps[] = matchedFollowingGroups.map(
						(item) => ({
							groupId: item.id,
							groupTitle: item.data.name,
							groupTags: item.data.tags,
							groupMember: item.data.groupUsers.length,
							groupImageURL: item.data.groupImageURL,
						})
					);

					const activeGroupData: GroupUIProps[] = matchedActiveGroups.map(
						(item) => ({
							groupId: item.id,
							groupTitle: item.data.name,
							groupTags: item.data.tags,
							groupMember: item.data.groupUsers.length,
							groupImageURL: item.data.groupImageURL,
						})
					);

					console.log(followingGroupData, activeGroupData);

					setArchiveActiveGroupData(activeGroupData);
					setArchiveFollowingGroupData(followingGroupData);
				} catch (error) {
					console.error('Error fetching user document: ', error);
				}
			}
		};

		fetchUserGroups();
	}, []);

	return (
		<ProfileBottomGroupWrap>
			{isGroupUI === true ? (
				<>
					<div className='participated group-tab' onClick={() => openDetail(1)}>
						<span>참여한 그룹</span>
						<button>
							<img src={arrowNext}></img>
						</button>
					</div>
					{archiveActiveGroupData.map((groupItem) => (
						<GroupUI
							groupId={groupItem.groupId}
							groupTitle={groupItem.groupTitle}
							groupTags={groupItem.groupTags}
							groupMember={groupItem.groupMember}
							groupImageURL={groupItem.groupImageURL}
						/>
					))}
					<div className='follow group-tab' onClick={() => openDetail(2)}>
						<span>팔로우 한 그룹</span>
						<button>
							<img src={arrowNext}></img>
						</button>
					</div>
					{archiveFollowingGroupData.map((groupItem) => (
						<GroupUI
							groupId={groupItem.groupId}
							groupTitle={groupItem.groupTitle}
							groupTags={groupItem.groupTags}
							groupMember={groupItem.groupMember}
							groupImageURL={groupItem.groupImageURL}
						/>
					))}
				</>
			) : (
				<img className='no-group' src={sowithHeart} />
			)}
		</ProfileBottomGroupWrap>
	);
};

const ProfileBottomGroupWrap = styled.section`
	margin-top: 3%;
	position: relative;

	& .group-tab {
		cursor: pointer;
		width: 88%;
		margin: 10px auto 0;
		display: flex;
		justify-content: space-between;
		& span {
			font-family: var(--font--SemiBold);
			line-height: 27px;
		}
		& img {
			width: 27px;
		}
	}

	& .no-group {
		position: absolute;
		top: 250%;
		left: 50%;
	}
`;
