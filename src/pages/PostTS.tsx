import { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../components/post/PostHeader";
import { PostSelectPicturePage } from "./post/PostSelectPicturePage";
import { PostInputInfoPage } from "./post/PostInputInfoPage";
import { PostFilterPage } from "./post/PostFilterPage";

interface ImageData {
  src: string;
}

const imageData: ImageData[] = [
  { src: "https://picsum.photos/200/191" },
  { src: "https://picsum.photos/200/192" },
  { src: "https://picsum.photos/200/193" },
  { src: "https://picsum.photos/200/194" },
  { src: "https://picsum.photos/200/195" },
  { src: "https://picsum.photos/200/196" },
  { src: "https://picsum.photos/200/197" },
  { src: "https://picsum.photos/200/198" },
  { src: "https://picsum.photos/200/199" },
  { src: "https://picsum.photos/200/201" },
  { src: "https://picsum.photos/200/202" },
  { src: "https://picsum.photos/200/203" }
];

interface PostInfo {
  phrase: string,
  location: string,
  folder: string,
  hashtag: string[],
  usertag: string[],
}

const PostInfoData: PostInfo = {
  phrase: "",
  location: "",
  folder: "",
  hashtag: [],
  usertag: [],
}

interface FilterDataItem {
  src: string;
  filter: string;
}

export const PostTS: React.FC = () => {

  const [selectedPicture, setSelectedPicture] = useState<string[]>([]);
  const [filterStorage, setFilterStorage] = useState<FilterDataItem[]>([]);
  
  useEffect(() => {
    const newData = selectedPicture.map((item) => ({
      src: item,
      filter: ""
    }));
    setFilterStorage(newData);
  }, [selectedPicture]);  
  
  const [step, setStep] = useState<number>(0);
  const [postInfo, setPostInfo] = useState<PostInfo>(PostInfoData);

  return (
    <AppContainer>
      <ViewContainer>
        <Header content={'다음'} step={step} setStep={setStep} selectedPicture={selectedPicture.length} locationSet={!!postInfo.location}/>

        <MainWrap>
          {[
            <PostSelectPicturePage
              imageData={imageData}
              setSelectedPicture={setSelectedPicture}
            />,
            <PostFilterPage
              filterStorage={filterStorage}
              setFilterStorage={setFilterStorage}
              selectedPicture={selectedPicture}
            />,
            <PostInputInfoPage
              filterStorage={filterStorage}
              postInfo={postInfo}
              setPostInfo={setPostInfo}
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
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  box-sizing: border-box;
`;

const MainWrap = styled.div`
  width: calc(100% + 5px);
  height: 90%;
  /* height: calc(100% - 54px - 50px); */
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