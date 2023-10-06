import { useState } from "react";
import styled from "styled-components";

import { SearchBar } from "../../components/post/PostSearchBar";
import { UserItem } from "../../components/post/PostUserItem";
import { Button } from "../../components/common/Button"

import IconUserTag from "../../assets/icon/icon-user-tag.svg";
import profile_1 from "../../assets/testImg/profile_1.jpg";
import profile_2 from "../../assets/testImg/profile_2.jpg";
import profile_3 from "../../assets/testImg/profile_3.jpg";
import profile_4 from "../../assets/testImg/profile_4.jpg";
import profile_5 from "../../assets/testImg/profile_5.jpg";

interface PostInfo {
  phrase: string,
  location: string,
  folder: string,
  hashtag: string[],
  usertag: string[],
}

interface SelectFolderProps {
  setPostInfo: React.Dispatch<React.SetStateAction<PostInfo>>
  closeModal: () => void; 
}

interface TagData {
  userId: string;
  userName: string;
  isFollow?: boolean;
  profile: string;
}

const tagData: TagData[] = [
  {
    userId: 'starseeker_h00n',
    userName: '강동훈',
    isFollow: true,
    profile: profile_1
  },
  {
    userId: '__hoon__99',
    userName: '이정훈',
    isFollow: true,
    profile: profile_2
  },
  {
    userId: 'kang_hoon',
    userName: '한승훈',
    isFollow: true,
    profile: profile_3
  },
  {
    userId: 'kang_hoon',
    userName: '이강훈',
    isFollow: true,
    profile: profile_4
  },
  {
    userId: 'hoon_1297319',
    userName: '미스터훈',
    isFollow: true,
    profile: profile_5
  },
];
export const PostSelectUserTagPage: React.FC<SelectFolderProps> = ({ setPostInfo, closeModal }) => {

  // const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState<string | string[]>("");
  const [checkedBox, setCheckedBox] = useState<number[]>([]);
  const [tagItem, setTagItem] = useState<TagData[]>(tagData);
  const [selectTag, setSelectTag] = useState<string[]>([]);

  const handleCloseModal = () => {
    closeModal();
    setPostInfo(Prev => {
      const updatedPostInfo = { ...Prev };
      updatedPostInfo.usertag = selectTag;
      return updatedPostInfo;
    });
    }
    
    const handleTag = (event: React.MouseEvent<HTMLLIElement>) => {
      const targetElement = event.currentTarget.dataset.id;
      if (targetElement) {
        const newTags = [...selectTag];
        if (!newTags.includes(targetElement)) {
          newTags.push(targetElement);
          setSelectTag(newTags);
        }
      }
    };


  // useEffect(() => {
  //   const priorityElements = tagItem.filter((_, item) => checkedBox.includes(item));
  //   const remainingElements = tagItem.filter((_, item) => !checkedBox.includes(item));
  //   const result = [...priorityElements, ...remainingElements];
  //   setTagItem(result);
  // }, [checkedBox]);

  return (
    <>
        {/* <SearchBar
        id={'UserTagSearch'}
        icon={IconUserTag}
        tagname={'humantag'}
        placeholder={'유저 검색...'}
        selectTag={selectId}
        setSelectTag={setSelectId}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        /> */}

        <SearchBar
          id={'UserTagSearch'}
          icon={IconUserTag}
          placeholder={'유저 검색...'}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />

        <Container>
          {tagItem.map((item, index) => (
            <ul>
              <UserItem
                handleFunc={handleTag}
                key={index}
                profile={item.profile}
                userId={item.userId}
                userName={item.userName}
                isFollow={item.isFollow}
                index={index}
                checkedBox={checkedBox}
                setCheckedBox={setCheckedBox}
              />
            </ul>
          )
          )}
        </Container>
        <Button
        type="button"
        text={"완료"}
        width={'90%'}
        height={'41px'}
        fontSize={'12px'}
        margin={'16px 0 16px'}
        fontFamily={'var(--font--Bold)'}
        onClick={handleCloseModal}
      />
    </>
  );
};

const Container = styled.div`
  width: 90%;
  height: calc(100% - 170px);
  padding: 16px 13px 0;
  margin-right: -5px;
  overflow-y: scroll;

  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: var(--main-color);
  }
`;
