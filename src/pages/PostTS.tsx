import { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { Header } from "../components/post/PostHeader";
import { PostSelectPicturePage } from "./post/PostSelectPicturePage";
import { PostInputInfoPage } from "./post/PostInputInfoPage";
import { PostFilterPage } from "./post/PostFilterPage";

// interface FilterDataItem {
//   src: string;
//   filter: string;
// }

export const PostTS: React.FC = () => {

  const [postForm, setPostForm] = useRecoilState(postFormState)
  const [filterStorage, setFilterStorage] = useState<any>(postForm.picture);
  const [selectedPicture, setSelectedPicture] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setPostForm((Prev) => {
      const data = { ...Prev };
      data.picture = filterStorage;
      return data;
    });
  }, [filterStorage])

  return (
    <AppContainer>
      <ViewContainer>
        <Header content={'다음'} step={step} setStep={setStep} filterStorageLength={postForm.picture.length} />
        <MainWrap>
          {[
            // <PostSelectPicturePage
            //   imageData={imageData}
            //   setSelectedPicture={setSelectedPicture}
            // />,
            <PostFilterPage
              filterStorage={filterStorage}
              setFilterStorage={setFilterStorage}
              selectedPicture={selectedPicture}
              setSelectedPicture={setSelectedPicture}
            />,
            <PostInputInfoPage
              filterStorage={filterStorage}
            />
          ][step]}
        </MainWrap>

      </ViewContainer>
      {/* <div className="NavBar"></div> */}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  position: relative;
  margin: auto;
  /* padding: 50px 0 10px; */
  box-sizing: border-box;
  overflow: hidden;
  height: 100vh;

  .NavBar {
    position: absolute;
    bottom: 0;
    background-color: red;
    min-width: 100%;
    min-height: 50px;
  }
  `;

const ViewContainer = styled.div`
  position: relative;
  margin: auto;
  /* min-width: 320px;
  max-width: 768px; */
  width: 100%;
  height: 100%;
  padding: 40px 20px 0;
  /* border-left: 20px solid transparent;
  border-right: 20px solid transparent; */
  box-sizing: border-box;
`;

const MainWrap = styled.div`
  width: calc(100% + 5px);
  height: calc(100% - 57px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 8px;

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
    width: 100%;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;