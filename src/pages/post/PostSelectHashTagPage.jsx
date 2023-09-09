import { useEffect, useState } from "react";
import { styled } from "styled-components"

import { useModalControl } from "../../hooks/useModalControl";
import { SearchBar } from "../../components/common/post/SearchBar";
import { Button } from "../../components/common/Button";

import IconHashTag from "../../assets/icon/icon-hash-tag.svg";

export const PostSelectHashTagPage = () => {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectTag, setSelectTag] = useState([]);
  const { openModal, closeModal, ModalComponent } = useModalControl();

  const handleTag = (event) => {
    const targetElement = event.currentTarget.dataset.id;
    targetElement && setSelectTag([...selectTag, targetElement]);
  };

  useEffect(() => {
    openModal();
  }, [])

  return (
    <>
      <ModalComponent>
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
          <Tag onClick={handleTag} data-id={'당근노맛'}>
            <p>당근노맛</p>
            <span>없음</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근'}>
            <p>당근</p>
            <span>4.3k</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근케이크'}>
            <p>당근케이크</p>
            <span>2.1k</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근마켓'}>
            <p>당근마켓</p>
            <span>1k</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근라페'}>
            <p>당근라페</p>
            <span>938</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근김밥'}>
            <p>당근김밥</p>
            <span>500</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근요리'}>
            <p>당근요리</p>
            <span>416</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근존맛'}>
            <p>당근존맛</p>
            <span>23</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근존맛'}>
            <p>당근존맛</p>
            <span>23</span>
          </Tag>
          <Tag onClick={handleTag} data-id={'당근존맛'}>
            <p>당근존맛</p>
            <span>23</span>
          </Tag>
        </TagList>
        
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
  )
}

const TagList = styled.ul`
  width: 90%;
  height: calc(100% - 170px);
  padding: 16px 13px 0;
  padding-right: 13px;
  margin-right: -5px;
  overflow-y: scroll;

  &::-webkit-scrollbar-corner{
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


