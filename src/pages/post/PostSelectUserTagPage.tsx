import { useEffect, useState } from "react";
import styled from "styled-components";

import { useFirestoreRead } from "hooks/useFirestoreRead";
import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";
import { UserItem } from "../../components/post/PostUserItem";
import { Button } from "../../components/common/Button"
import getUserInfo from "utils/getUserInfo";

import IconUserTag from "../../assets/icon/icon-user-tag.svg";

interface SelectFolderProps {
  closeModal: () => void;
}

export const PostSelectUserTagPage: React.FC<SelectFolderProps> = ({ closeModal }) => {

  const { ReadField } = useFirestoreRead('users');

  const uid = getUserInfo();

  const [postForm, setPostForm] = useRecoilState(postFormState)
  const [selectTag, setSelectTag] = useState<any>(postForm.usertag.map(item => item.data.accountId));
  const [searchKeyword, setSearchKeyword] = useState<any>('');
  const [tagItem, setTagItem] = useState<any>(postForm.usertag);
  const [selectResultTags, setSelectResultTags] = useState<any>([]);
  const [searchResultTags, setSearchResultTags] = useState<any>([]);
  const [firstMount, setFirstMount] = useState<boolean>(true);

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setPostForm(Prev => {
        const updatedPostInfo = { ...Prev };
        updatedPostInfo.usertag = selectResultTags;
        return updatedPostInfo;
      });
    }, 600)
  }

  useEffect(() => {
    firstMount && setSelectResultTags(postForm.usertag)
    setFirstMount(false)
  }, [])

  useEffect(() => {
    const fetchData = () => {
      return ReadField('accountIdKeywords', 'array-contains', searchKeyword);
    }
    !firstMount && fetchData().then(response => setTagItem(response));
  }, [searchKeyword])

  useEffect(() => {
    const selectedItems = tagItem.filter(item => selectTag.includes(item.data.accountId));
    const unselectedItems = tagItem.filter(item => !selectTag.includes(item.data.accountId));
    setSelectResultTags([...selectedItems])
    setSearchResultTags([...unselectedItems]);
  }, [selectTag, tagItem])

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
        {selectResultTags.map((item, index) => (
          <ul>
            <UserItem
              key={index}
              profile={item.data.profileImageURL}
              userId={item.data.accountId}
              userName={item.data.accountName}
              isFollow={item.data.followers.includes(uid)}
              index={index}
              selectTag={selectTag}
              setSelectTag={setSelectTag}
            />
          </ul>
        )
        )}
        {searchResultTags.map((item, index) => (
          <ul>
            <UserItem
              key={index}
              profile={item.data.profileImageURL}
              userId={item.data.accountId}
              userName={item.data.accountName}
              isFollow={item.data.followers.includes(uid)}
              index={index}
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
