import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useModalControl } from "../../hooks/useModalControl";
import { SearchBar } from "../../components/post/PostSearchBar";
import { Button } from "../../components/common/Button";
import { UserItem } from "../../components/post/PostUserItem";

import IconUserTag from "../../assets/icon/icon-user-tag.svg";
import profile_1 from "../../assets/testImg/profile_1.jpg";
import profile_2 from "../../assets/testImg/profile_2.jpg";
import profile_3 from "../../assets/testImg/profile_3.jpg";
import profile_4 from "../../assets/testImg/profile_4.jpg";
import profile_5 from "../../assets/testImg/profile_5.jpg";
import { CircleCheckBox } from "components/common/CheckBox";

export const PostSelectUserTagPage: React.FC = () => {

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

  const [searchKeyword, setSearchKeyword] = useState("");
  const { openModal, closeModal, ModalComponent } = useModalControl();
  const [checkedBox, setCheckedBox] = useState<number[]>([]);
  const [tagItem, setTagItem] = useState<TagData[]>(tagData);

  // useEffect(() => {
  //   const priorityElements = tagItem.filter((_, item) => checkedBox.includes(item));
  //   const remainingElements = tagItem.filter((_, item) => !checkedBox.includes(item));
  //   const result = [...priorityElements, ...remainingElements];
  //   setTagItem(result);
  // }, [checkedBox]);
  
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <ModalComponent>
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
            <div >
              <UserItem
                // key={index}
                // handleFunc={handleTag}
                profile={item.profile}
                userId={item.userId}
                userName={item.userName}
                isFollow={item.isFollow}
                index={index}
                checkedBox={checkedBox}
                setCheckedBox={setCheckedBox}
              />
            </div>
          )
          )}
        </Container>

        <Button
          type="button"
          text={"완료"}
          width={'90%'}
          height={'41px'}
          fontSize={'12px'}
          margin={'auto 0 12px'}
          fontFamily={'var(--font--Bold)'}
          onClick={closeModal}
        />
      </ModalComponent>
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
