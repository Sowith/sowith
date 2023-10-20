import { useEffect, useState } from 'react';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { styled } from 'styled-components';

import { GroupUI, GroupUIProps } from 'components/common/GroupUI';

export const SearchTrendingGroupList: React.FC = () => {
	const [archiveGroupData, setArchiveGroupData] = useState<GroupUIProps[]>([]);

	const firestoreReader = useFirestoreRead('groups');

	useEffect(() => {
		const fetchTrendingGroups = async () => {
			const response = await firestoreReader.ReadAllDocument();

			const groupData: GroupUIProps[] = response.map((item) => ({
				groupId: item.id,
				groupTitle: item.data.name,
				groupTags: item.data.tags,
				groupMember: item.data.groupUsers.length,
				groupImageURL: item.data.groupImageURL,
			}));

			setArchiveGroupData(groupData);
		};

		fetchTrendingGroups();
	}, []);

	return (
		<Container>
			{archiveGroupData.map((groupItem) => (
				<GroupUI
					groupId={groupItem.groupId}
					groupTitle={groupItem.groupTitle}
					groupTags={groupItem.groupTags}
					groupMember={groupItem.groupMember}
					groupImageURL={groupItem.groupImageURL}
				/>
			))}
		</Container>
	);
};

const Container = styled.section`
	padding-top: 10px;
`;
