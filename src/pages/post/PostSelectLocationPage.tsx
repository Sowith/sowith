import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

import { useModalControl } from "../../hooks/useModalControl";
import { SearchBar } from "../../components/post/PostSearchBar";
import { Button } from "../../components/common/Button";

import IconLocation from "../../assets/icon/icon-location.svg";
import dotIcon from "../../assets/icon/icon-dot.svg";

export const PostSelectLocationPage: React.FC = () => {
  
  const { openModal, closeModal, ModalComponent } = useModalControl();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <ModalComponent>
        <SearchBar
          id={'locationSearch'}
          icon={IconLocation}
          tagname={'hashtag'}
          placeholder={'위치 검색...'}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />

        <Container>
          <LocationItem>
            <p className="location-name">상도 당근 마켓</p>
            <span className="location-categories">마트</span>
            <LocationDetail>
              <span className="location-distance">0.1km</span>
            </LocationDetail>
          </LocationItem>
          <LocationItem>
            <p className="location-name">서울</p>
            <span className="location-distance">6.3km</span>
          </LocationItem>
          <LocationItem>
            <p className="location-name">서울 동작구 상도동</p>
            <span className="location-categories">마트</span>
            <LocationDetail>
              <span className="location-distance">0.9km</span>
            </LocationDetail>
          </LocationItem>
          <LocationItem>
            <p className="location-name">숭실대학교</p>
            <span className="location-categories">학교</span>
            <LocationDetail>
              <span className="location-distance">1.3km</span>
              <img src={dotIcon} alt="spacing dot" />
              <span className="location-address">서울시 동작구 상도로 369 숭실대학교</span>
            </LocationDetail>
          </LocationItem>
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

const Container = styled.ul`
  width: 90%;
  padding: 16px 13px 0;
  height: calc(100% - 170px);
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

const LocationItem = styled.li`
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 5px;

  &:hover {
    background-color: var(--main-color);
    color: #FFF;
    span {
      color: #FFF;
    }
  }
  .location-name {
    display: inline;
    font-size: 16px;
    padding-right: 10px;
  }
  .location-categories {
    font-size: 12px;
    color: #898888;
  }
  .location-distance,
  .location-address {
    display: block;
    font-size: 14px;
    color: #898888;
  }
`;

const LocationDetail = styled.div`
  display: flex;
  gap: 5px;
`;
