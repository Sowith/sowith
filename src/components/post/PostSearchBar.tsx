import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";

import { HashTag } from "../common/HashTag";
import { UserTag } from "../common/UserTag";

import IconCurrentLocation from "../../assets/icon/icon-current-location-.svg";

interface SearchBarProps {
  value?: any;
  id: string;
  icon: string;
  tagname?: string;
  placeholder: string;
  selectTag?: string[];
  setSelectTag?: React.Dispatch<React.SetStateAction<string[]>>;
  searchKeyword?: string | string[];
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string | string[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  id,
  icon,
  tagname,
  placeholder,
  selectTag,
  setSelectTag,
  searchKeyword,
  setSearchKeyword,
}) => {

  const [inputValue, setInputValue] = useState<any>(value);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const handleInputBlur = () => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = wrapRef.current.scrollHeight;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnBlur = () => {
    setSearchKeyword && setSearchKeyword(inputValue);
  };

  const handleDeleteTag = (index: number) => {
    setSelectTag && setSelectTag((prevData) => prevData.filter((item, i) => i !== index));
  };

  useEffect(() => {
    handleInputBlur();
  }, [selectTag]);

  useEffect(() => {
    setInputValue(searchKeyword);
  }, [searchKeyword])

  return (
    <WrapStyle ref={wrapRef}>
      {/* <WrapStyle onBlur={handleInputBlur} ref={wrapRef}> */}
      {selectTag?.map((tag, index) =>
        tagname === "hashtag" ? (
          <HashTag key={index} index={index} tag={tag} handleDeleteTag={handleDeleteTag} />
        ) : (
          <UserTag key={index} index={index} tag={tag} handleDeleteTag={handleDeleteTag} />
        )
      )}
      <InputStyle id={id}>
        <label htmlFor={id}></label>
        <input
          id={id}
          type="text"
          value={inputValue || value}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          placeholder={placeholder}
        />
        <IconHashTagPosition>
          <img src={icon} alt="Icon" />
        </IconHashTagPosition>
      </InputStyle>
      {id === "locationSearch" && (
        <IconCurrentLocationPosition>
          <img src={IconCurrentLocation} alt="Icon" />
        </IconCurrentLocationPosition>
      )}
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  position: relative;
  width: 90%;
  margin-bottom: 2px;
  max-height: 76px;
  padding: 8px 0;
  box-shadow: 0px 2px 0 0px var(--main-color);
  min-height: 50px;
  box-sizing: border-box;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const InputStyle = styled.div`
  position: relative;
  display: inline-block;
  width: ${(props) => props.id === "hashTagSearch" ? "" : "inherit"};

  input {
    font-size: 16px;
    padding: 0 0 0 25px;
    width: 90%;
    height: 25px;
    margin: 6px;
    border: none;
    outline: none;
    background-color: unset;
  }
`;

const IconHashTagPosition = styled.div`
  position: absolute;
  left: 4px;
  top: 8px;
`;

const IconCurrentLocationPosition = styled.div`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`;