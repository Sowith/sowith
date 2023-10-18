import { useEffect } from 'react';
import styled from 'styled-components';
import { SearchTrendingTagItem } from './SearchTrendingTagItem';
import { TrendingTagData } from './SearchTrendingTagItem';

export const SearchTrendingTagList: React.FC = () => {
  const tagData = [
    '🔥 HOT',
    'JavaScript',
    'Styled Components',
    'Web Development',
    'Frontend',
    '유럽여행',
    '용리단길',
    'NBA',
    '피렌체',
  ];

  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     try {
  //       const tagsData: TrendingTagData[] = [];
  //       const q = query(collection(appFireStore, 'tags'));
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data() as TrendingTagData;
  //         console.log(data);
  //         const tags = {
  //           folderId: doc.id,
  //           name: data.name,
  //           likeCount: data.likeCount,
  //           folderImages: data.folderImages,
  //           tags: data.tags,
  //           like: data.like,
  //           bookmark: data.bookmark,
  //         };
  //         folderData.push(folder);
  //       });

  //       console.log(folderData);

  //       setArchiveFolderData(folderData);
  //     } catch (error) {
  //       console.error('Firestore에서 폴더를 가져오는 중 오류 발생:', error);
  //     }
  //   };

  //   fetchFolders();
  // }, []);

  return (
    <Container>
      {tagData.map((tag, index) => (
        <SearchTrendingTagItem key={index} trendingTag={tag} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 88%;
  padding: 5px;
  gap: 10px;
  margin: 0 auto;
  display: flex;
  overflow: auto;
`;
