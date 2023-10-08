import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";

const filterData = [
  { filterName: "원본", filter: "" },
  { filterName: "느와르", filter: "grayscale(100%)" },
  { filterName: "색상반전", filter: "invert(100%)" },
  { filterName: "세피아", filter: "sepia(100%)" },
  { filterName: "채도낮게", filter: "saturate(50%)" },
  { filterName: "색상대비", filter: "contrast(150%)" },
  { filterName: "색조회전", filter: "brightness(70%)" },
  // { filterName: "흐릿하게", filter: "blur(5px)" },
  // { filterName: "그림자", filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))" },
];

interface Photo {
  src: string;
  filter: string;
}

interface FilterDataItem {
  src: string;
  filter: string;
}

interface FilterPreviewProps {
  selectedPicture?: string;
  filterStorage: Photo[];
  setFilterStorage: React.Dispatch<React.SetStateAction<FilterDataItem[]>>;
}

export const FilterPreview: React.FC<FilterPreviewProps> = ({ selectedPicture, filterStorage, setFilterStorage }) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startXPoint, setStartXPoint] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilterStorage((Prev) => {
      const updatedPrev = [...Prev];
      const targetIndex = updatedPrev.findIndex((item) => item.src === selectedPicture);
      if (targetIndex !== -1) {
        updatedPrev[targetIndex].filter = filterData[currentIndex].filter;
      }
      return updatedPrev;
    });
  }, [currentIndex]);

  useEffect(() => {
    const targetIndex = filterStorage.findIndex((item) => item.src === selectedPicture)
    if (targetIndex !== -1) {
      const filterToFind = filterStorage[targetIndex].filter;
      const foundFilter = filterData.findIndex(item => item.filter === filterToFind);
      setCurrentIndex(foundFilter)
    }
  }, [selectedPicture]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const itemWidth = 135;
      const newIndex = Math.floor(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
      setStartXPoint(scrollPosition)
    }
  };

  const handleTouchMove = () => {
    setIsScroll(false)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsScroll(true)
    }, 500);
  }

  return (
    <WrapperStyle>
      <SliderContainer
        onScroll={handleScroll}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        <SliderWrapper currentIndex={currentIndex} startXPoint={startXPoint} isScroll={isScroll}
        >
          {filterData.map((item, index) => (
            <ImageWrapper
              key={index}
              isSelected={index === currentIndex}
              onClick={() => {
                setIsScroll(true)
                setCurrentIndex(index)
              }}
            >
              <Image filter={item.filter} src={selectedPicture} alt="" />
              <FilterName>{item.filterName}</FilterName>
            </ImageWrapper>
          ))}
        </SliderWrapper>
      </SliderContainer>
    </WrapperStyle>
  );
};

const WrapperStyle = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    right: 50%;
    transform: translateX(50%);
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #FC9763;
  }
`;

const SliderContainer = styled.div`
  overflow-x: scroll;
  padding-top: 2px;
  height: 165px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  `;

const SliderWrapper = styled.div<{ currentIndex: number, startXPoint: number, isScroll: boolean }>`
  display: flex;
  gap: 5px;
  margin-left: calc(50% - 65px);
  padding-right: calc(50% - 70px);
  transition: transform .5s;
  transform: translateX(
    ${(props) => props.isScroll && -(props.currentIndex * (130 + 5) - props.startXPoint)}px
    );
  width: ${(props) => filterData.length * (130 + 5)}px;
`;


const ImageWrapper = styled.div<{ isSelected: boolean }>`
  position: relative;
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
  transition: outline .1s;
  outline: ${(props) =>
    props.isSelected ? "2px solid #FC9763" : "#FFF"};
`;

const FilterName = styled.div`
  font-size: 0.8rem;
  position: absolute;
  bottom: -35px;
  right: 50%;
  transform: translateX(50%);
  display: block;
  padding: 5px 10px;
  border-radius: 30px;
  color: #FFF;
  font-family: var(--font--Bold);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Image = styled.img<{ filter: string }>`
  filter: ${(props) => props.filter};
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  outline: none;
`;