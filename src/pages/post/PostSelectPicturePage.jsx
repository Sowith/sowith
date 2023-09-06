import { useState } from "react";
import styled from "styled-components";

import { CheckBox } from "../../components/common/post/CheckBox";

export const PostSelectPicturePage = () => {

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
    { src: "https://picsum.photos/200/191" },
    { src: "https://picsum.photos/200/192" },
    { src: "https://picsum.photos/200/193" },
    { src: "https://picsum.photos/200/194" },
    { src: "https://picsum.photos/200/195" },
    { src: "https://picsum.photos/200/196" },
    { src: "https://picsum.photos/200/197" },
    { src: "https://picsum.photos/200/198" },
  ];

  const [checkedBox, setCheckedBox] = useState([]);

  return (
    <>
      <h1 className="a11y-hidden">PostUpload</h1>
      <AlbumWrap>
        <AlbumListStyle>
          {imageData.map((image, index) => (
            <AlbumStyle key={index}>
              <img src={image.src} alt={`Album ${index}`} />
              <CheckBoxStyle>
                <CheckBox index={index} checkedBox={checkedBox} setCheckedBox={setCheckedBox} />
              </CheckBoxStyle>
            </AlbumStyle>
          ))}
        </AlbumListStyle>
      </AlbumWrap>
    </>
  );
}

const AlbumWrap = styled.div`
  position: relative;
`;

const AlbumListStyle = styled.ul`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
`;

const AlbumStyle = styled.li`
  list-style-type: none;
  position: relative;

  & img {
    width: 100%;
    vertical-align: top;
    object-fit: cover;
  }
`;

const CheckBoxStyle = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
`;