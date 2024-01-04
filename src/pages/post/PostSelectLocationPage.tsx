import { useState, useEffect } from "react";
import { styled } from "styled-components";

import { useRecoilState } from "recoil";
import postFormState from "recoil/postFormState";

import { SearchBar } from "../../components/post/PostSearchBar";

import IconLocation from "../../assets/icon/icon-location.svg";
import dotIcon from "../../assets/icon/icon-dot.svg";

declare const kakao: any;

interface SelectLocationProps {
  closeModal: () => void;
}

export const PostSelectLocationPage: React.FC<SelectLocationProps> = ({ closeModal }) => {

  const [postForm, setPostForm] = useRecoilState(postFormState)
  const [searchKeyword, setSearchKeyword] = useState<string | string[]>(postForm.location.locationName || "");
  const [locationItems, setLocationItems] = useState<any>([]);
  const [isTrackingLocation, setIsTrackingLocation] = useState<boolean>(false);

  const getCurrentCoordinate = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinate = new kakao.maps.LatLng(lat, lon);
          resolve(coordinate);
        });
      } else {
        reject(new Error("현재 위치를 불러올 수 없습니다."));
      }
    });
  };

  const formatDistance = (meter) => {
    const km = meter / 1000;
    if (km >= 1) {
      return `${km.toFixed(1)}km`;
    } else {
      return `${meter}m`;
    }
  }

  const getRegionCoordinate = (geocoder, latlng) => new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), function (currentRegion, status) {
      if (status === kakao.maps.services.Status.OK) {
        resolve(currentRegion);
      } else {
        reject(status);
      }
    });
  });

  const fetchLocationListByAddress = (geocoder, searchResult) => new Promise<any>((resolve) => {
    geocoder.addressSearch(searchResult, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const locationList = result.map(locationData => ({
          locationName: locationData.address_name,
          locationCategories: '',
          locationDistance: '',
          position: {
            lat: locationData.y,
            lng: locationData.x,
          },
        }));
        resolve(locationList);
      } else {
        console.error("위치정보를 불러올 수 없습니다.");
        resolve([]);
      }
    });
  });

  const fetchLocationListByKeyword = (ps, searchKeyword, options) => new Promise<any>((resolve) => {
    ps.keywordSearch(searchKeyword, (result, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const searchResult: any[] = [];
        result.forEach((locationData) => {
          searchResult.push({
            locationName: locationData.place_name,
            locationCategories: locationData.category_group_name,
            locationDistance: formatDistance(locationData.distance),
            locationAddress: locationData.address_name,
            position: {
              lat: locationData.y,
              lng: locationData.x,
            },
          });
        });
        resolve(searchResult);
      } else {
        console.error("위치정보를 불러올 수 없습니다.");
        resolve([]);
      }
    }, options);
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const geocoder = new kakao.maps.services.Geocoder();
      const ps = new kakao.maps.services.Places();

      const coordinate = await getCurrentCoordinate();

      const options = {
        location: coordinate,
        // radius: 10000,
        // sort: kakao.maps.services.SortBy.DISTANCE,
      };

      const addressSearchResult = await fetchLocationListByAddress(geocoder, searchKeyword);
      const keywordSearchResult = await fetchLocationListByKeyword(ps, searchKeyword, options);
      setLocationItems([...addressSearchResult, ...keywordSearchResult])
    };

    if (searchKeyword.length === 0) {
      setLocationItems([]);
    } else {
      fetchLocation();
    }
  }, [searchKeyword]);

  useEffect(() => {
    const fetchLocation = async () => {
      setSearchKeyword([])
      const coordinate = await getCurrentCoordinate();
      const geocoder = new kakao.maps.services.Geocoder();

      const searchResult = await getRegionCoordinate(geocoder, coordinate);
      const locationList = await fetchLocationListByAddress(geocoder, searchResult && searchResult[0].address_name);
      setLocationItems(locationList);
    }

    if (isTrackingLocation) {
      fetchLocation();
      setIsTrackingLocation(false);
    }
  }, [isTrackingLocation]);

  const handleCloseModal = (locationItem) => {
    closeModal();
    setTimeout(() => {
      setPostForm((Prev) => {
        const updatedPostInfo = { ...Prev };
        updatedPostInfo.location = locationItem;
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
        setIsTrackingLocation={setIsTrackingLocation}
      />

      <Container>
        {
          locationItems.map((item, index) => (
            <LocationItem key={index} onClick={() => handleCloseModal(item)}>
              <p className="location-name">{item.locationName}</p>
              <span className="location-categories">{item.locationCategories || ""}</span>
              <LocationDetail>
                {item.locationDistance &&
                  <>
                    <span className="location-distance">{item.locationDistance}</span>
                    <img src={dotIcon} alt="spacing dot" />
                  </>
                }
                <span className="location-address">{item.locationAddress || ""}</span>
              </LocationDetail>
            </LocationItem>
          ))
        }
      </Container>
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
  min-height: 57px;
  box-sizing: border-box;
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
