import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";
import { ReactComponent as IconPictureCount } from "../../assets/icon/icon-picture-count.svg";

interface FilterDataItem {
  src: string;
  filter: string;
}

interface SelectedPictureProps {
  filterStorage: FilterDataItem[];
} 

export const SelectedPicture: React.FC<SelectedPictureProps> = ({ filterStorage }) => {
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseWheel = (event) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
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

  return (
    <WrapStyle ref={scrollContainerRef}>
      {filterStorage.map((item, index) => (
        <Image key={index} src={item.src} alt="" filter={item.filter}/>
      ))}
      <PictureCountStyle>
        <IconPictureCount />
        <span>{filterStorage.length}</span>
      </PictureCountStyle>
    </WrapStyle>
  );
};

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
`;

const Image = styled.img<{filter: string}>`
  filter: ${(props) => props.filter};
  width: 130px;
  height: 130px;
  object-fit: cover;
`;

const PictureCountStyle = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 45px;
  height: 25px;
  padding: 2px;
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
