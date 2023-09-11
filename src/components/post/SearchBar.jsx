import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components"

import { HashTag } from "../HashTag";
import { UserTag } from "../UserTag";

import IconCurrentLocation from "../../../assets/icon/icon-current-location-.svg";

export const SearchBar = ({ id, icon, tagname, placeholder, selectTag, setSelectTag, searchKeyword, setSearchKeyword }) => {
  const [inputValue, setInputValue] = useState("");
  const wrapRef = useRef(null);

  const handleInputBlur = () => {
    wrapRef.current.scrollTop = wrapRef.current.scrollHeight;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnBlur = () => {
    setSearchKeyword(inputValue)
  }

  const handleDeleteTag = (index) => {
    setSelectTag(prevData => prevData.filter(item => item !== selectTag[index]));
  }

  useEffect(() => {
    handleInputBlur()
    console.log(selectTag);
  }, [selectTag])

  return (
    <WrapStyle onBlur={handleInputBlur} ref={wrapRef}>
      {selectTag?.map((tag, index) => (
        tagname === "hashtag" ?
          <HashTag index={index} tag={tag} handleDeleteTag={handleDeleteTag} /> :
          <UserTag index={index} tag={tag} handleDeleteTag={handleDeleteTag} />
      ))}
      <InputStyle>
        <label htmlFor={id}></label>
        <input
          id={id}
          type="text"
          value={inputValue || searchKeyword}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          placeholder={placeholder}
        />
        <IconHashTagPosition>
          <img src={icon} alt="Icon" />
        </IconHashTagPosition>
      </InputStyle>
      {id === "locationSearch" &&
        <IconCurrentLocationPosition>
          <img src={IconCurrentLocation} alt="Icon" />
        </IconCurrentLocationPosition>
      }
    </WrapStyle>
  )
}

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

  input {
    font-size: 16px;
    padding: 0 0 0 25px;
    width: 70px;
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

