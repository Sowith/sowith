import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CountCheckBox } from "components/common/CheckBox";

interface SelectPictureProps {
  setSelectedPicture: React.Dispatch<React.SetStateAction<string[]>>;
  imageData: ImageData[];
}

interface ImageData {
  src: string;
}


export const PostSelectPicturePage: React.FC<SelectPictureProps> = ({ setSelectedPicture, imageData }) => {

  const [checkedBox, setCheckedBox] = useState<number[]>([]);

  useEffect(() => {
  const selectedPictures: string[] = checkedBox.map((item) => imageData[item].src);
  setSelectedPicture([...selectedPictures]);
  }, [checkedBox]);

  return (
    <>
      <h1 className="a11y-hidden">PostUpload</h1>
      <AlbumWrap>
        <AlbumListStyle>
          {imageData.map((image, index) => (
            <AlbumStyle key={index}>
              <img src={image.src} alt={`Album ${index}`} />
              <CheckBoxStyle>
                <CountCheckBox
                  id={index}
                  checkedBox={checkedBox}
                  setCheckedBox={setCheckedBox}
                />
              </CheckBoxStyle>
            </AlbumStyle>
          ))}
        </AlbumListStyle>
      </AlbumWrap>
    </>
  );
};

const AlbumWrap = styled.div`
  position: relative;
`;

const AlbumListStyle = styled.ul`
  width: 100%;
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
    height: 100%;
    vertical-align: top;
    object-fit: cover;
  }
`;

const CheckBoxStyle = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
`;
