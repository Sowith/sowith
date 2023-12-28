import { useEffect, useState } from 'react'
import styled from 'styled-components';

import { useWindowHeight } from 'hooks/useWindowHeight';
import { useFirestoreRead } from 'hooks/useFirestoreRead';
import { useModalControl } from 'hooks/useModalControl';
import { MainPostItem } from '../../components/main/MainPostItem';
import { MainPostMoreMenu } from 'components/main/MainPostMoreMenu';
import { MainComment } from 'components/main/MainComment';

export const MainPostViewPage: React.FC = () => {

  const { ReadAllDocument } = useFirestoreRead('posts');

  const [isCommentModal, setIsCommentModal] = useState<string>("");
  const isCommentModalBoolean = isCommentModal.split(",")[0];
  const { openModal, closeModal, ModalComponent, isModalOff } = useModalControl(200, isCommentModalBoolean === "true" ? false : true);
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [PostItemData, setPostItemData] = useState<any>([]);
  const windowHeight = useWindowHeight();

  useEffect(() => {
    if (isCommentModalBoolean === "true" || isCommentModalBoolean === "false") {
      openModal();
    }
  }, [isCommentModal])

  const AllPostData = async () => {
    const response = await ReadAllDocument('createdAt', 'desc');

    response && setPostItemData(response)
  }

  useEffect(() => {
    AllPostData()
  }, [])

  useEffect(() => {
    isModalOff === true && AllPostData();
  }, [isModalOff])

  return (
    <AppContainer style={{ height: `${windowHeight}px` }}>
      <ViewContainer>
        <>
          {PostItemData.length > 0 && PostItemData.map((item) => (
            <>
              <MainPostItem key={item.id} item={item} setIsCommentModal={setIsCommentModal} setSelectedPostId={setSelectedPostId} />
            </>
          ))
          }
          <ModalComponent>
            {isCommentModalBoolean === "true" && <MainComment selectedPostId={selectedPostId} />}
            {isCommentModalBoolean === "false" && <MainPostMoreMenu closeModal={closeModal} selectedPostId={selectedPostId} setPostItemData={setPostItemData} />}
          </ModalComponent>
        </>
      </ViewContainer>
    </AppContainer>

  )
}

const AppContainer = styled.div`
position: relative;
margin: auto;
/* padding: 50px 0 10px; */
box-sizing: border-box;
overflow: hidden;
`;

const ViewContainer = styled.div`
position: relative;
margin: auto;
/* min-width: 320px;
max-width: 768px; */
width: 100%;
height: 100%;
/* border-left: 20px solid transparent;
border-right: 20px solid transparent; */
box-sizing: border-box;
/* overflow-y: scroll; */
overflow-x: hidden;
`;