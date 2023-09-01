import styled from "styled-components"

export function SelectLocation({ setStep }) {

  return (
    <>
    <h1>PostUpload</h1>
    <h2>위치설정</h2>
    <SelectLocationWrap>
    <label htmlFor="searchLocation">위치검색 (hidden처리)</label>
    <input id="searchLocation" type="text" placeholder="위치 검색"/>
    
    <LocationList>
      <LocationItem onClick={()=>setStep(1)}>
        <strong>상도 당근 마켓</strong>
        <span>마트</span>
        <p>0.1km</p>
      </LocationItem>
      <LocationItem onClick={()=>setStep(1)}>
        <strong>서울</strong>
        <span></span>
        <p>6.3km</p>
      </LocationItem>
      <LocationItem onClick={()=>setStep(1)}>
        <strong>서울 동작구 상도동</strong>
        <span></span>
        <p>0.9km</p>
      </LocationItem>
      <LocationItem onClick={()=>setStep(1)}>
        <strong>숭실대학교</strong>
        <span>학교</span>
        <p>1.3km 서울시 동작구 상도로 369 숭실대학교</p>
      </LocationItem>
    </LocationList>
    </SelectLocationWrap>
    </>
  )
}

const SelectLocationWrap = styled.div`
    width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: #756e6e;

    & input {
      margin-top: 10px;
      padding: 5px;
    }
`;

const LocationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LocationItem = styled.li`
  box-shadow: 0px 1px #000;
  cursor: pointer;

  & strong {
    display: inline;
    padding-right: 10px;
  }
  & span {
    color : #c4c4c4
  }
`;