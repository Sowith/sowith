import { useState, useEffect } from "react";
import { styled } from "styled-components";

import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";
import { Button } from "../../components/common/Button"

import IconLocation from "../../assets/icon/icon-location.svg";
import dotIcon from "../../assets/icon/icon-dot.svg";

interface SelectLocationProps {
  closeModal: () => void;
}

interface LocationData {
  locationName: string,
  locationCategories: string,
  locationDistance: string,
  locationAddress: string
}

const locationData: LocationData[] = [
  {
    locationName: '상도 당근 마켓',
    locationCategories: "마트",
    locationDistance: "0.1km",
    locationAddress: ""
  },
  {
    locationName: '서울',
    locationCategories: "",
    locationDistance: "163km",
    locationAddress: ""
  },
  {
    locationName: '서울 동작구 상도동',
    locationCategories: "마트",
    locationDistance: "0.9km",
    locationAddress: ""
  },
  {
    locationName: '숭실대학교',
    locationCategories: "학교",
    locationDistance: "1.3km",
    locationAddress: "서울시 동작구 상도로 369 숭실대학교"
  },
];

export const PostSelectLocationPage: React.FC<SelectLocationProps> = ({ closeModal }) => {

  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [postForm, setPostForm] = useRecoilState(postFormState)
  const [searchKeyword, setSearchKeyword] = useState<any>(postForm.location);
  const [locationItems, setLocationItems] = useState<LocationData[]>(locationData);


  const handlePostInfo = (locationName) => {
    setSearchKeyword(locationName)
  }

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setPostForm((Prev) => {
        const updatedPostInfo = { ...Prev };
        if (!Array.isArray(searchKeyword)) {
          updatedPostInfo.location = searchKeyword;
        }
        return updatedPostInfo;
      });
    }, 400)
  }

  return (
    <>
      <SearchBar
        id={'locationSearch'}
        icon={IconLocation}
        tagname={'hashtag'}
        placeholder={'위치 검색...'}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <Container>
        {
          locationItems.map((item, index) => (
            <LocationItem key={index} onClick={() => handlePostInfo(item.locationName)}>
              <p className="location-name">{item.locationName}</p>
              <span className="location-categories">{item.locationCategories || ""}</span>
              <LocationDetail>
                <span className="location-distance">{item.locationDistance}</span>
                <img src={dotIcon} alt="spacing dot" />
                <span className="location-address">{item.locationAddress || ""}</span>
              </LocationDetail>
            </LocationItem>
          ))
        }
      </Container>
      <Button
        type="button"
        text={"완료"}
        width={'90%'}
        height={'41px'}
        fontSize={'12px'}
        margin={'16px 0 16px'}
        fontFamily={'var(--font--Bold)'}
        onClick={() => {
          handleCloseModal()
        }}
      />
    </>
  );
};

const Container = styled.ul`
  width: 90%;
  padding: 16px 13px 0;
  height: calc(100% - 170px);
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
