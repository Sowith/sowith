import { useRef, useEffect } from "react";
import { styled } from "styled-components";

import { ReactComponent as IconPictureCount } from "../../../assets/icon/icon-picture-count.svg";

export const SelectedPicture = () => {

    const scrollContainerRef = useRef(null);
  
    const handleMouseWheel = (e) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };
  
    useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener("wheel", handleMouseWheel);
        return () => {
          container.removeEventListener("wheel", handleMouseWheel);
        };
      }
    }, []);

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
    { src: "https://picsum.photos/200/199" },
  ];

  return (
    <WrapStyle ref={scrollContainerRef}>
      {imageData.map((item, index) => <img key={index} src={item.src} alt="" />)}
      <PictureCountStyle>
        <IconPictureCount />
        <span>{imageData.length}</span>
      </PictureCountStyle>
    </WrapStyle>
  );
}

const WrapStyle = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 5px;
  padding-bottom: 8px;

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
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }
`;


const PictureCountStyle = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 45px;
  height: 25px;
  padding: 1px;
  box-sizing: border-box;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;

  span {
    padding-left: 3px;
    color: #fff;
    font-weight: var(--font--Bold);
    font-size: 12px;
  }
`;
