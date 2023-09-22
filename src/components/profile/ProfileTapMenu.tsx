import { styled } from "styled-components";
import { useState } from "react";

import { ProfileBottomPost } from "./profileBottom/ProfileBottomPost";
// import { ProfileBottomFolder } from "./profileBottom/ProfileBottomFolder";
import { ProfileBottomGroup } from "./profileBottom/profileBottomGroup";
// import { ProfileBottomBookMark } from "./profileBottom/ProfileBottomBookMark";
import { StepBar } from "components/common/StepBar";
import { FolderList } from "../common/FolderList";

import iconPost from "../../assets/icon/icon-post.svg";
import iconFolder from "../../assets/icon/icon-folder.svg";
import iconGroup from "../../assets/icon/icon-group.svg";
import iconBookmark from "../../assets/icon/icon-bookmark.svg";

interface FolderData {
  folderId: number;
  name: string;
  totalpost: number;
  bookmark: boolean;
  src: string[];
}

export const ProfileTabMenu = () => {

  const folderData: FolderData[] = [
    {
      folderId: 1,
      name: '빠니보틀의 로드맵',
      totalpost: 10,
      bookmark: true,
      src: [
        'https://picsum.photos/200/191',
        'https://picsum.photos/200/192',
        'https://picsum.photos/200/193',
        'https://picsum.photos/200/194',
      ],
    },
    {
      folderId: 2,
      name: '용리단길 맛집 모음',
      totalpost: 78,
      bookmark: true,
      src: [
        'https://picsum.photos/200/195',
        'https://picsum.photos/200/196',
        'https://picsum.photos/200/197',
        'https://picsum.photos/200/198',
      ],
    },
    {
      folderId: 3,
      name: '내 2023년 여름',
      totalpost: 10,
      bookmark: false,
      src: [
        'https://picsum.photos/200/199',
        'https://picsum.photos/200/200',
        'https://picsum.photos/200/201',
        'https://picsum.photos/200/202',
      ],
    },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [archiveFolderData, setArchiveFolderData] =
  useState<FolderData[]>(folderData);

  const openTabMenu = (e) => {
    setCurrentStep(e);
  };

  return (
    <>
      <ProfileTabMenuWrap>
        <div>
          <button onClick={() => openTabMenu(1)}>
            <img src={iconPost} />
          </button>
          <button onClick={() => openTabMenu(2)}>
            <img src={iconFolder} />
          </button>
          <button onClick={() => openTabMenu(3)}>
            <img src={iconGroup} />
          </button>
          <button onClick={() => openTabMenu(4)}>
            <img src={iconBookmark} />
          </button>
        </div>
      </ProfileTabMenuWrap>
      <ProfileBottom>
        <StepBar currentStep={currentStep} howManyTabs={4} />
        {currentStep === 1 && <ProfileBottomPost />}
        {currentStep === 2 && (
          <FolderList
            archiveFolderData={archiveFolderData}
            setArchiveFolderData={setArchiveFolderData}
          />
        )}
        {currentStep === 3 && <ProfileBottomGroup />}
        {currentStep === 4 && (
          <FolderList
            archiveFolderData={archiveFolderData}
            setArchiveFolderData={setArchiveFolderData}
          />
        )}
      </ProfileBottom>
    </>
  );
};

const ProfileTabMenuWrap = styled.div`
  width: 88%;
  margin: 0 auto;
  overflow: hidden;

  & > div {
    display: flex;
    button {
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      text-align: center;
      flex: 1;
    }
  }
`;

const ProfileBottom = styled.section`
  width: 100%;
  overflow-y: auto;
`;
