import { useState } from "react";
import { styled } from "styled-components";

import { Button } from "../../components/common/Button";
import { SquareCheckBox } from "components/common/CheckBox";
import { SearchBar } from "../../components/post/PostSearchBar";

import { ReactComponent as IconCreateFolder } from "../../assets/icon/icon-create-folder.svg";
import IconHashTag from "../../assets/icon/icon-hash-tag.svg";

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

interface CreateFolderProps {
  closeModal: () => void;
}

export const PostCreateFolderPage: React.FC<CreateFolderProps> = ({ closeModal }) => {


  const [selectTag, setSelectTag] = useState<string[]>([]);
  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string | string[]>("");
  const [archiveTagData, setArchiveTagData] = useState<TagData[]>(tagData);
  const [checkedBox, setCheckedBox] = useState<number[]>([]);

  const handleTag = (event: React.MouseEvent<HTMLLIElement>) => {
    const targetElement = event.currentTarget.dataset.id;
    targetElement && setSelectTag([...selectTag, targetElement]);
  };

  return (
    <>
        <FolderWrap>
          <IconCreateFolderPosition>
            <IconCreateFolder width={80} height={80} />
          </IconCreateFolderPosition>

          <FolderInfo>
            <InputStyle>
              <label htmlFor={""}></label>
              <input
                id={""}
                type="text"
                placeholder={"폴더명"}
              />
            </InputStyle>
            
            <CheckPoint>
              <SquareCheckBox id={0} checkedBox={checkedBox} setCheckedBox={setCheckedBox}/>
              <p>비밀 폴더로 유지</p>
            </CheckPoint>
          </FolderInfo>
        </FolderWrap>

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
          text={"생성"}
          width={'90%'}
          height={'41px'}
          fontSize={'12px'}
          margin={'16px 0 16px'}
          fontFamily={'var(--font--Bold)'}
          onClick={closeModal}
        />
    </>
  );
};


const FolderWrap = styled.div`
  margin: 50px 0 30px;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const FolderInfo = styled.div`
  width: 100%;
`;

const IconCreateFolderPosition = styled.div`
  padding: 33px 30px 33px 40px;
  box-sizing: border-box;
  border-radius: 40px;
  background-color: rgba(231, 231, 231, 1);
  /* margin-top: 65px; */
  margin-right: 30px;
`;

const InputStyle = styled.div`
  box-shadow: 0px 2px 0 0px var(--main-color);
  margin-bottom: 32px;
  max-height: 76px;
  padding: 8px 0;
  min-height: 50px;
  box-sizing: border-box;

  input {
    font-size: 16px;
    padding: 0 0 0 2px;
    /* width: 70px; */
    height: 25px;
    margin: 6px;
    border: none;
    outline: none;
    background-color: unset;
  }
`;

const CheckPoint = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gray300-color);
`;

const TagList = styled.ul`
  width: 90%;
  height: calc(100% - 170px);
  padding: 16px 13px 0;
  padding-right: 13px;
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

