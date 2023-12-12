import { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";
import { UserItem } from "../../components/post/PostUserItem";
import { Button } from "../../components/common/Button"

import IconUserTag from "../../assets/icon/icon-user-tag.svg";
import profile_1 from "../../assets/testImg/profile_1.jpg";
import profile_2 from "../../assets/testImg/profile_2.jpg";
import profile_3 from "../../assets/testImg/profile_3.jpg";
import profile_4 from "../../assets/testImg/profile_4.jpg";
import profile_5 from "../../assets/testImg/profile_5.jpg";

interface SelectFolderProps {
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
    userId: 'dong_hoon',
    userName: '한동훈',
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
export const PostSelectUserTagPage: React.FC<SelectFolderProps> = ({ closeModal }) => {

  const [postForm, setPostForm] = useRecoilState(postFormState)  
  const [selectTag, setSelectTag] = useState<any>(postForm.usertag);
  const [searchKeyword, setSearchKeyword] = useState<any>();
  const [tagItem, setTagItem] = useState<TagData[]>(tagData);


  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setPostForm(Prev => {
        const updatedPostInfo = { ...Prev };
        updatedPostInfo.usertag = selectTag;
        return updatedPostInfo;
      });
    }, 600)
    }
    
    // const handleTag = (event: React.MouseEvent<HTMLLIElement>) => {
    //   const targetElement = event.currentTarget.dataset.id;
    //   if (targetElement) {
    //     const newTags = [...selectTag];
    //     if (!newTags.includes(targetElement)) {
    //       newTags.push(targetElement);
    //       setSelectTag(newTags);
    //     }
    //   }
    // };

    useEffect(() => {
      const selectedItems = tagItem.filter(item => selectTag.includes(item.userId));
      const unselectedItems = tagItem.filter(item => !selectTag.includes(item.userId));
      const sortedTagItems = [...selectedItems, ...unselectedItems];
      setTagItem(sortedTagItems);
    }, [selectTag])

  return (
    <>
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
                // handleFunc={handleTag}
                key={index}
                profile={item.profile}
                userId={item.userId}
                userName={item.userName}
                isFollow={item.isFollow}
                index={index}
                // checkedBox={checkedBox}
                // setCheckedBox={setCheckedBox}
                selectTag={selectTag}
                setSelectTag={setSelectTag}
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
  /* margin-right: -5px; */
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
