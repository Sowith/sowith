import { useState, useEffect } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import styled from 'styled-components';

import { BackButton } from 'components/common/BackButton';
import { GroupUI, GroupUIProps } from 'components/common/GroupUI';

export const SearchTrendingGroup: React.FC = () => {
	const [archiveGroupData, setArchiveGroupData] = useState<GroupUIProps[]>([]);

	const firestoreReader = useFirestoreRead('groups');
	useEffect(() => {
		const fetchTrendingGroups = async () => {
			const response = await firestoreReader.ReadAllDocument();

			const groupdata: GroupUIProps[] = response.map((item) => ({
				groupId: item.id,
				groupTitle: item.data.name,
				groupTags: item.data.tags,
				groupMember: item.data.groupUsers.length,
				groupImageURL: item.data.groupImageURL,
			}));

			setArchiveGroupData(groupdata);
		};

		fetchTrendingGroups();
	}, []);

	return (
		<Container>
			<h1 className='a11y-hidden'>인기 그룹 페이지</h1>
			<TopNav>
				<BackButton />
				<p>인기 그룹</p>
			</TopNav>
			<TrendingGroup>
				{archiveGroupData.map((groupItem) => (
					<GroupUI
						groupId={groupItem.groupId}
						groupTitle={groupItem.groupTitle}
						groupTags={groupItem.groupTags}
						groupMember={groupItem.groupMember}
						groupImageURL={groupItem.groupImageURL}
					/>
				))}
			</TrendingGroup>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	background-color: #ffffff;
	margin: 0 auto;
	padding-bottom: 10px;

	section {
		padding-top: 18px;
	}
`;

const TopNav = styled.div`
	display: flex;
	width: 88%;
	align-items: center;
	gap: 5px;
	margin: 0 auto;
	margin-top: 40px;
	p {
		font-size: 1.5rem;
		font-family: var(--font--SemiBold);
	}
`;

const TrendingGroup = styled.section`
	width: 100%;
	margin: 0;
	margin-top: 30px;
`;
