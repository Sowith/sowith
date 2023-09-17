import React, { useState } from "react";
import styled from "styled-components";


import { PostSelectPicturePage } from "./post/PostSelectPicturePage";
import { PostInputInfoPage } from "./post/PostInputInfoPage";
import { PostSelectLocationPage } from "./post/PostSelectLocationPage";
import { PostSelectFolderPage } from "./post/PostSelectFolderPage";
import { PostSelectHashTagPage } from "./post/PostSelectHashTagPage";
import { PostSelectUserTagPage } from "./post/PostSelectUserTagPage";
import { Header } from "../components/post/PostHeader";

import { useAlertControl } from "../hooks/useAlertControl";
import { AlertBox } from "../components/common/AlertBox";

export const PostTS: React.FC = () => {
  
  const [selectedPicture, setSelectedPicture] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);
  const [isPostPage, setIsPostPage] = useState<boolean>(false);
  const { openAlert, AlertComponent } = useAlertControl();

  return (
    <AppContainer>
      <button onClick={openAlert}>알림 버튼</button>
      <AlertComponent>
        <AlertBox alertMsg={'위치 입력은 필수입니다'} choice={['확인']} />
      </AlertComponent>
      <ViewContainer>
        <Header content={'다음'} handleFunc={() => setIsPostPage(true)} />
        <MainWrap>
          {!isPostPage && (
            <PostSelectPicturePage
              // selectedPicture={selectedPicture}
              // setSelectedPicture={setSelectedPicture}
              // setStep={setStep}
            />
          )}
          {isPostPage && (
            <PostInputInfoPage
              // selectedPicture={selectedPicture}
              setStep={setStep}
            />
          )}
          {[
            null,
            <PostSelectLocationPage />,
            <PostSelectFolderPage />,
            <PostSelectHashTagPage />,
            <PostSelectUserTagPage />,
          ][step]}
        </MainWrap>
      </ViewContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  margin: auto;
  padding: 50px 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  height: 100vh;
  box-shadow: inset 0 0 10px #000;
`;

const ViewContainer = styled.div`
  position: relative;
  margin: auto;
  min-width: 320px;
  max-width: 768px;
  width: 100%;
  height: 100%;
  border-left: 20px solid #FFF;
  border-right: 20px solid #FFF;
  box-sizing: border-box;
`;

const MainWrap = styled.div`
  height: 90%;
  overflow-y: scroll;
  margin-right: -5px;

  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: var(--main-color);
  }

  @media (max-width: 768px) {
    margin-right: 0;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;