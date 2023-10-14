import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SelectedFilter } from 'components/post/PostSelectedFilter'
import { FilterPreview } from 'components/post/PostFilterPreview'


// const imageData = [
//   { src: "https://picsum.photos/200/191", filter: "" },
//   { src: "https://picsum.photos/200/192", filter: "" },
//   { src: "https://picsum.photos/200/193", filter: "" },
//   { src: "https://picsum.photos/200/194", filter: "" },
//   { src: "https://picsum.photos/200/195", filter: "" },
//   { src: "https://picsum.photos/200/196", filter: "" },
// ];

interface FilterDataItem {
  src: string;
  filter: string;
}

interface FilterProps {
  selectedPicture: string[];
  filterStorage: FilterDataItem[];
  setFilterStorage:  React.Dispatch<React.SetStateAction<FilterDataItem[]>>;
}

export const PostFilterPage: React.FC<FilterProps> = ({selectedPicture, filterStorage, setFilterStorage}) => {
  const [visiblePicture, setVisiblePicture] = useState<string>("");
  
  
  return (
    <WrapperStyle>
    <SelectedFilter filterStorage={filterStorage} setSelectedPicture={setVisiblePicture}/>
    <FilterPreview selectedPicture={visiblePicture} filterStorage={filterStorage} setFilterStorage={setFilterStorage}/>
    </WrapperStyle>
  )
}

const WrapperStyle = styled.div`
  height: inherit;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
`;