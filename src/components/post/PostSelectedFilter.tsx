import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface Photo {
  src: string;
  filter: string;
}

interface SelectedFilterProps {
  filterStorage: any;
  setSelectedPicture?: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedFilter: React.FC<SelectedFilterProps> = ({ filterStorage, setSelectedPicture }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const imageSliderRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filterStorage.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filterStorage.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    setSelectedPicture && setSelectedPicture(filterStorage[currentIndex]?.src);
    if (imageSliderRef.current) {
      imageSliderRef.current.style.transform = `translateX(${currentIndex * -100}%)`;
    }
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const windowInnerWidth = window.innerWidth
    windowInnerWidth < 1024 && setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const subtract = Math.abs(startX - currentX);
    // const difference = subtract >= 100 ? 100 : subtract;
  
    const imageSliderRefCurrent = imageSliderRef.current;
    if (imageSliderRefCurrent) {
      const pixelsToMove = subtract; 
      const transformPercentage = (pixelsToMove / imageSliderRefCurrent.clientWidth) * 100; 
  
      if (startX < currentX) {
        imageSliderRefCurrent.style.transform = `translateX(${currentIndex * -100 + transformPercentage}%)`;
      } else if (startX > currentX) {
        imageSliderRefCurrent.style.transform = `translateX(${currentIndex * -100 - transformPercentage}%)`;
      }
    }
  };  

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   if (startX === null) return;
  //   const currentX = e.touches[0].clientX;
  //   const subtract = Math.abs(startX - currentX)
  //   const difference = subtract >= 100 ? 100 : subtract

  //   if (imageSliderRef.current && startX < currentX) {
  //     imageSliderRef.current.style.transform = `translateX(${currentIndex * -100 + (100% - difference)}%)`;
  //   } else if (imageSliderRef.current && startX > currentX) {
  //     imageSliderRef.current.style.transform = `translateX(${currentIndex * -100 - (100% - difference)}%)`;
  //   }
  // };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;

    if (startX < endX) {
      goToPrevious();
    } else if (startX > endX) {
      goToNext();
    }
    setStartX(null);
  };

  return (
    <WrapperStyle isMainPostView={location.pathname==="/mainpostview"} selectedLength={filterStorage.length}>
      <div
        className="photo-navigator"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="dots">
          {filterStorage.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
        <ImageSliderWrapper isMainPostView={location.pathname==="/mainpostview"}>
          <ImageSlider ref={imageSliderRef} currentIndex={currentIndex}>
            {filterStorage.map((photo, index) => (
              <ImageStyle
                key={index}
                src={photo}
                alt={`사진 ${index + 1}`}
                filter={photo.filter}
              />
            ))}
          </ImageSlider>
        </ImageSliderWrapper>
          <button className="previous-btn" onClick={goToPrevious}></button>
          <button className="next-btn" onClick={goToNext}></button>
      </div>
    </WrapperStyle>
  );
};

const WrapperStyle = styled.div<{isMainPostView : boolean, selectedLength: number}>`
  position: relative;
  height: 70%;
  
  .previous-btn,
  .next-btn {
    position: absolute;
    width: 50%;
    height: 100%;
    @media (max-width: 1023px) {
      display: none;
    }
  }
  .previous-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
  
  .photo-navigator {
    height: 100%;
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .dots {
    position: absolute;
    background-color: ${(props) => props.isMainPostView ? "" : "rgba(0, 0, 0, 0.5)"};
    padding: 10px 10px;
    border-radius: 30px;
    display: ${(props) => props.selectedLength === 1 ? "none" : "flex"};
    bottom: ${(props) => props.isMainPostView ? "-28px" : "10px"};
    z-index: 999;
  }
  .dot {
    width: 8px;
    height: 8px;
    background-color: ${(props) => props.isMainPostView ? "#767676" : "#FFF"};
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: transform .1s;
  }
  .dot.active {
    background-color: #FC9763; 
    transform: scale(1.5);
  }
`;

const ImageSliderWrapper = styled.div<{isMainPostView : boolean}>`
  overflow: hidden;
  width: 100%;
  border-radius: ${(props) => props.isMainPostView ? "0px" : "5px"};
  /* width: 90%; */
  height: 100%;
`;

const ImageSlider = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.3s ease;
  height: inherit;
`;

const ImageStyle = styled.img<{ filter: string }>`
  filter: ${(props) => props.filter};
  min-width: 100%;
  object-fit: cover;
`;
