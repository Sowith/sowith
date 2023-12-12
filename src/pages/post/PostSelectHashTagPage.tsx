import { useState } from "react";
import { styled } from "styled-components";

import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";
import { Button } from "../../components/common/Button"

import IconHashTag from "../../assets/icon/icon-hash-tag.svg";

interface SelectHashTagProps {
  closeModal: () => void; 
}

interface TagData {
  tagName: string;
  postCount?: number;
}

const tagData: TagData[] = [
  {
    tagName: '당근노맛'
  },
  {
    tagName: '당근',
    postCount: 4300
  },
  {
    tagName: '당근케이크',
    postCount: 2100
  },
  {
    tagName: '당근마켓',
    postCount: 1000
  },
  {
    tagName: '당근라페',
    postCount: 938
  },
  {
    tagName: '당근김밥',
    postCount: 500
  },
  {
    tagName: '당근요리',
    postCount: 416
  },
];

export const PostSelectHashTagPage: React.FC<SelectHashTagProps> = ({ closeModal }) => {

  const [postForm, setPostForm] = useRecoilState(postFormState)  
  const [selectTag, setSelectTag] = useState<string[]>(postForm.hashtag);
  const [searchKeyword, setSearchKeyword] = useState<any>();
  const [archiveTagData, setArchiveTagData] = useState<TagData[]>(tagData);

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

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setPostForm(Prev => {
        const updatedPostInfo = { ...Prev };
        updatedPostInfo.hashtag = selectTag;
        return updatedPostInfo;
      });
    }, 400)
  }

  return (
    <>
      <SearchBar
        id={'hashTagSearch'}
        icon={IconHashTag}
        tagname={'hashtag'}
        placeholder={'태그 검색...'}
        selectTag={selectTag}
        setSelectTag={setSelectTag}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <TagList>
        <>
          {archiveTagData.map((item, index) =>
            <Tag onClick={handleTag} key={index} data-id={item.tagName}>
              <p>{item.tagName}</p>
              <span>{item.postCount}</span>
            </Tag>
          )}
        </>
      </TagList>
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

const TagList = styled.ul`
  width: 90%;
  height: calc(100% - 170px);
  padding: 16px 13px 0;
  padding-right: 13px;
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

const Tag = styled.li`
  padding: 13px;
  margin: auto;
  box-sizing: border-box;
  pointer-events: all;
  height: 50px;
  border-radius: 30px;
  border: 1px solid #767676;
  font-family: var(--font--Regular);

  &:hover {
    border: solid 1px transparent;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #ff547c, #ffc76c);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
  & + & {
    margin-top: 6px;
  }
  p {
    display: inline;
    position: relative;
    font-size: 12px;
  }
  p::before {
    content: "#  ";
  }
  p::after {
    content: "";
    position: absolute;
    right: -10px;
    top: 55%;
    transform: translateY(-50%);
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: #C4C4C4;
  }
  span {
    padding-left: 20px;
    font-size: 8px;
    color: #C4C4C4;
  }
  span::before {
    content: "게시물 ";
  }
`;
