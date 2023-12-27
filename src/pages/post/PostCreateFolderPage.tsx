import { useState, useEffect } from "react";
import { styled } from "styled-components";

import { useFirestoreRead } from "hooks/useFirestoreRead";
import { useFirestoreUpdate } from "hooks/useFirestoreUpdate";
import { useFirestoreCreate } from "hooks/useFirestoreCreate";
import { useCreateKeywords } from "hooks/useCreateKeywords";
import { arrayUnion } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { useAlertControl } from "hooks/useAlertControl";
import { AlertBox } from "components/common/AlertBox";

import { Button } from "../../components/common/Button";
import { SquareCheckBox } from "components/common/CheckBox";
import { SearchBar } from "../../components/post/PostSearchBar";

import iconCreateFolder from "../../assets/icon/icon-create-folder.svg";
import IconHashTag from "../../assets/icon/icon-hash-tag.svg";

interface CreateFolderProps {
  openModal: () => void;
  closeModal: () => void;
  setModalIndex?: React.Dispatch<React.SetStateAction<number>>
}

export const PostCreateFolderPage: React.FC<CreateFolderProps> = ({ openModal, closeModal, setModalIndex }) => {

  const { openAlert, AlertComponent } = useAlertControl();
  const { ReadField, ReadDocument } = useFirestoreRead('tags')
  const { UpdateField } = useFirestoreUpdate('tags');
  const { CreateDocumentWithCustomID } = useFirestoreCreate('tags')
  const { CreateDocument } = useFirestoreCreate('folders')
  const { generateKeywordCombinations } = useCreateKeywords();
  const [selectTag, setSelectTag] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<any>('')
  const [archiveTagData, setArchiveTagData] = useState<any>([]);
  const [checkedBox, setCheckedBox] = useState<number[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>();
  const [inputValue, setInputValue] = useState<any>('');

  const createdAt = Timestamp.fromDate(new Date());

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
    if (inputValue === '') {
      openAlert()
      return
    }

    closeModal();
    setTimeout(async () => {
      const folderUid = await CreateDocument({
        bookmarkedUsers: [],
        folderImages: [],
        folderName: inputValue,
        folderNameKeywords: generateKeywordCombinations(inputValue) || [],
        hashtags: selectTag,
        likedUsers: [],
        postUids: [],
        private: checkedBox.length > 0 ? true : false
      })
      selectTag.map(async item => {
        const isExistTag = await UpdateField(
          {
            taggedFolderIDs: arrayUnion(folderUid)
          }, item, false);
        !isExistTag && CreateDocumentWithCustomID(item, {
          createdAt: createdAt,
          tagNameKeywords: generateKeywordCombinations(item),
          taggedFolderIDs: arrayUnion(folderUid),
          taggedPostIDs: [],
        })
      })
      setModalIndex && setModalIndex(2)
      setTimeout(() => openModal(), 50)
    }, 400)
  }

  useEffect(() => {
    const searchCollectionData = async () => {
      const data = await ReadDocument(searchKeyword === '' ? ' ' : searchKeyword);
      setIsMatched(!!data ? true : false)
      return ReadField('tagNameKeywords', 'array-contains', searchKeyword);
    }
    searchCollectionData().then(response => setArchiveTagData(response));
  }, [searchKeyword])

  return (
    <>
      <FolderWrap>
        <AlertComponent>
          <AlertBox alertMsg={"폴더명을 반드시 입력해주세요."} choice={["확인"]} />
        </AlertComponent>
        <IconCreateFolder>
        </IconCreateFolder>

        <FolderInfo>
          <InputStyle>
            <label htmlFor={""}></label>
            <input
              id={""}
              type="text"
              placeholder={"폴더명"}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </InputStyle>

          <CheckPoint>
            <SquareCheckBox id={0} checkedBox={checkedBox} setCheckedBox={setCheckedBox} />
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
          {!isMatched && searchKeyword.length > 0 &&
            <Tag onClick={handleTag} data-id={searchKeyword}>
              <p>{searchKeyword}</p>
              <span>태그 생성하기</span>
            </Tag>
          }
          {archiveTagData.map((item, index) =>
            <Tag onClick={handleTag} key={index} data-id={item.id}>
              <p>{item.id}</p>
              <span className='posts-length'>{item.data.taggedPostIDs.length}</span>
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
        onClick={handleCloseModal}
      />
    </>
  );
};


const FolderWrap = styled.div`
  margin: 50px 0 30px;
  width: 90%;
  display: flex;
  gap: 30px;
  justify-content: space-between;
`;

const FolderInfo = styled.div`
  width: 100%;
`;

const IconCreateFolder = styled.div`
  width: 40%;
  aspect-ratio: 1 / 1;
  background: url(${iconCreateFolder}) no-repeat center;
  background-size: contain;
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

