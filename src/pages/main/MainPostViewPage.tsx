import { useEffect, useState } from 'react'
import styled from 'styled-components';

import { useFirestoreGet } from 'hooks/useFirestoreGet';
import { useModalControl } from 'hooks/useModalControl';
import { MainPostItem } from '../../components/main/MainPostItem';
import { MainPostMoreMenu } from 'components/main/MainPostMoreMenu';
import { MainComment } from 'components/main/MainComment';

export const MainPostViewPage: React.FC = () => {

  const [isCommentModal, setIsCommentModal] = useState<boolean>(true);
  const { openModal, closeModal, ModalComponent } = useModalControl(200, isCommentModal ? false : true);
  const [currentComments, setCurrentComments] = useState<any>([]);
  const [PostItemData, setPostItemData] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);

  const { SearchAllField } = useFirestoreGet('posts');
  const { SearchDocument } = useFirestoreGet('users');

  useEffect(() => {
    const fetchData = async () => {
      const response = await SearchAllField()
      response && setPostItemData(response)
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    if (currentComments.length > 0) {
      setIsCommentModal(true);
      openModal();
    }
  }, [currentComments]);

  return (
    <AppContainer>
      <ViewContainer>
        <>
          {PostItemData.length > 0 && PostItemData.map((item, index) => (
            <>
              <MainPostItem item={item} index={index} openModal={openModal} setIsCommentModal={setIsCommentModal} setCurrentComments={setCurrentComments} />
            </>
          ))
          }
          <ModalComponent>
            {isCommentModal ?
              <MainComment currentComments={currentComments}/> :
              <MainPostMoreMenu closeModal={closeModal} />
            }
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
height: 100vh;
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