import { useState } from "react";
import styled from "styled-components";

export function SelectPicture({ selectedPicture, setselectedPicture, setStep }) {

  const imageData = [
    { src: "https://picsum.photos/200/191" },
    { src: "https://picsum.photos/200/192" },
    { src: "https://picsum.photos/200/193" },
    { src: "https://picsum.photos/200/194" },
    { src: "https://picsum.photos/200/195" },
    { src: "https://picsum.photos/200/196" },
    { src: "https://picsum.photos/200/197" },
    { src: "https://picsum.photos/200/198" },
    { src: "https://picsum.photos/200/199" },
  ];

  const handleCheckbox = (event) => {
    const value = event.target.value;
    if (selectedPicture.includes(value)) {
      setselectedPicture(selectedPicture.filter(item => item !== value));
    } else {
      setselectedPicture([...selectedPicture, value]);
    }
  };

  return (
    <>
      <h1>PostUpload</h1>
      <div>
        <h2>선택한 이미지</h2>
        <ul>
          {selectedPicture.map((checkbox) => (
            <li key={checkbox}>{checkbox}</li>
          ))}
        </ul>
      </div>
      <AlbumWrap>
        <ButtonWrap>
        <button>촬영버튼</button>
        <button 
          onClick={()=>setStep(1)}
        >다음버튼</button>
        </ButtonWrap>
      <AlbumListStyle>
        {imageData.map((image, index) => (
          <AlbumStyle key={index}>
            <img src={image.src} alt={`Album ${index}`} />
            <input
              type="checkbox"
              value={`${index + 1}`}
              onChange={handleCheckbox}
              checked={selectedPicture.includes(`${index + 1}`)}
            />
          </AlbumStyle>
        ))}
      </AlbumListStyle>
      </AlbumWrap>
    </>
  );
}

const AlbumWrap = styled.div`
  width: 600px;
  margin: auto;
  position: relative;
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 30px;
`;

const AlbumStyle = styled.li`
  list-style-type: none;
  position: relative;

  & img {
    width: 100%;
    vertical-align: top;
    object-fit: cover;
  }

  & input { 
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }
`;

const AlbumListStyle = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 30px;
`;


